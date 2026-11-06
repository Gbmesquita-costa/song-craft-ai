import { describe, expect, it } from "vitest";

import { detectPitch, frequencyToNote, rootMeanSquare } from "./pitch";

const SAMPLE_RATE = 48_000;
const FRAME = 2048;

// Deterministic PRNG so the noise tests never flake.
const seededRandom = (seed: number) => () => {
  seed = (seed * 1_664_525 + 1_013_904_223) % 2 ** 32;
  return seed / 2 ** 32;
};

const sine = (
  frequency: number,
  { amplitude = 0.5, phase = 0, sampleRate = SAMPLE_RATE, length = FRAME } = {}
) =>
  Float32Array.from(
    { length },
    (_, i) =>
      amplitude * Math.sin((2 * Math.PI * frequency * i) / sampleRate + phase)
  );

const centsBetween = (a: number, b: number) => 1200 * Math.log2(a / b);

describe("detectPitch", () => {
  it.each([
    ["E2 (low guitar string)", 82.41],
    ["A2", 110],
    ["D3", 146.83],
    ["G3", 196],
    ["B3", 246.94],
    ["E4 (high guitar string)", 329.63],
    ["A4 (concert pitch)", 440],
    ["C6", 1046.5],
  ])("finds %s within 2 cents", (_label, frequency) => {
    const result = detectPitch(sine(frequency), { sampleRate: SAMPLE_RATE });

    expect(result).not.toBeNull();
    expect(Math.abs(centsBetween(result!.frequency, frequency))).toBeLessThan(
      2
    );
    expect(result!.clarity).toBeGreaterThan(0.9);
  });

  it("works at 44.1 kHz and does not depend on the starting phase", () => {
    for (const phase of [0, 1, 2.5]) {
      const result = detectPitch(
        sine(196, { sampleRate: 44_100, phase }),
        { sampleRate: 44_100 }
      );

      expect(Math.abs(centsBetween(result!.frequency, 196))).toBeLessThan(2);
    }
  });

  it("reports the fundamental of a harmonic-rich tone, not an overtone", () => {
    // Sawtooth-like: fundamental plus decaying harmonics, like a plucked string.
    const fundamental = 110;
    const buffer = new Float32Array(FRAME);
    for (let harmonic = 1; harmonic <= 8; harmonic++) {
      const partial = sine(fundamental * harmonic, {
        amplitude: 0.4 / harmonic,
      });
      partial.forEach((sample, i) => (buffer[i] += sample));
    }

    const result = detectPitch(buffer, { sampleRate: SAMPLE_RATE });

    expect(Math.abs(centsBetween(result!.frequency, fundamental))).toBeLessThan(
      5
    );
  });

  it("still tracks a sine buried in moderate noise", () => {
    const random = seededRandom(42);
    const buffer = sine(440).map((sample) => sample + (random() - 0.5) * 0.1);

    const result = detectPitch(buffer, { sampleRate: SAMPLE_RATE });

    expect(Math.abs(centsBetween(result!.frequency, 440))).toBeLessThan(5);
  });

  it("returns null for silence", () => {
    expect(
      detectPitch(new Float32Array(FRAME), { sampleRate: SAMPLE_RATE })
    ).toBeNull();
  });

  it("returns null for a signal below the RMS gate", () => {
    const quiet = sine(440, { amplitude: 0.005 });

    expect(detectPitch(quiet, { sampleRate: SAMPLE_RATE })).toBeNull();
  });

  it("returns null for white noise (no periodicity)", () => {
    const random = seededRandom(7);
    const noise = Float32Array.from({ length: FRAME }, () => random() - 0.5);

    expect(detectPitch(noise, { sampleRate: SAMPLE_RATE })).toBeNull();
  });

  it("ignores pitches outside the configured range", () => {
    const options = { sampleRate: SAMPLE_RATE, minFrequency: 200 };

    expect(detectPitch(sine(100), options)).toBeNull();
  });

  it("returns null when the frame is too short for the lowest frequency", () => {
    expect(
      detectPitch(sine(440, { length: 16 }), { sampleRate: SAMPLE_RATE })
    ).toBeNull();
  });
});

describe("frequencyToNote", () => {
  it("maps concert A to A4 with zero cents", () => {
    expect(frequencyToNote(440)).toEqual({
      name: "A",
      octave: 4,
      midi: 69,
      cents: 0,
      targetFrequency: 440,
    });
  });

  it.each([
    [261.63, "C", 4],
    [82.41, "E", 2],
    [277.18, "C#", 4],
    [27.5, "A", 0],
    [4186.01, "C", 8],
  ])("maps %f Hz to %s%i", (frequency, name, octave) => {
    const note = frequencyToNote(frequency)!;

    expect(note.name).toBe(name);
    expect(note.octave).toBe(octave);
    expect(Math.abs(note.cents)).toBeLessThan(1);
  });

  it("reports sharp notes as positive cents and flat ones as negative", () => {
    expect(frequencyToNote(445)!.cents).toBeCloseTo(19.56, 1);
    expect(frequencyToNote(435)!.cents).toBeCloseTo(-19.79, 1);
  });

  it("rounds to the nearest note at the half-semitone boundary", () => {
    // 60 cents above A4 is closer to A#4 (-40 cents) than to A4.
    const note = frequencyToNote(440 * 2 ** (60 / 1200))!;

    expect(note.name).toBe("A#");
    expect(note.cents).toBeCloseTo(-40, 5);
  });

  it("honours a different reference pitch", () => {
    const note = frequencyToNote(432, 432)!;

    expect(note.name).toBe("A");
    expect(note.cents).toBeCloseTo(0, 5);
    expect(note.targetFrequency).toBe(432);
  });

  it.each([0, -10, Number.NaN, Number.POSITIVE_INFINITY])(
    "returns null for %f",
    (frequency) => {
      expect(frequencyToNote(frequency)).toBeNull();
    }
  );
});

describe("rootMeanSquare", () => {
  it("is amplitude / sqrt(2) for a whole number of sine periods", () => {
    // 480 Hz at 48 kHz is exactly 100 samples per period.
    expect(rootMeanSquare(sine(480, { length: 4800 }))).toBeCloseTo(
      0.5 / Math.SQRT2,
      5
    );
  });
});
