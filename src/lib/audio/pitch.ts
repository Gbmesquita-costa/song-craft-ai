// Monophonic pitch detection with the YIN algorithm (de Cheveigné & Kawahara,
// "YIN, a fundamental frequency estimator for speech and music", 2002).
// Pure TypeScript with no browser APIs, so it runs on any Float32Array of
// samples: a Web Audio AnalyserNode frame in the app, a synthesized sine wave
// in the tests.

type PitchDetectionOptions = {
  sampleRate: number;
  /** Lowest frequency to look for, in Hz. 60 Hz covers a bass/guitar low E. */
  minFrequency?: number;
  /** Highest frequency to look for, in Hz. */
  maxFrequency?: number;
  /**
   * YIN absolute threshold on the cumulative mean normalized difference.
   * Lower is stricter (fewer false positives, more misses).
   */
  threshold?: number;
  /** Frames quieter than this RMS level are treated as silence. */
  minRms?: number;
};

type PitchResult = {
  /** Estimated fundamental frequency, in Hz. */
  frequency: number;
  /** 0..1, how periodic the frame is (1 - the YIN dip at the chosen lag). */
  clarity: number;
};

const DEFAULT_MIN_FREQUENCY = 60;
const DEFAULT_MAX_FREQUENCY = 1500;
const DEFAULT_THRESHOLD = 0.15;
const DEFAULT_MIN_RMS = 0.01;

const rootMeanSquare = (buffer: Float32Array) => {
  let sum = 0;
  for (let i = 0; i < buffer.length; i++) sum += buffer[i] * buffer[i];

  return Math.sqrt(sum / buffer.length);
};

const detectPitch = (
  buffer: Float32Array,
  {
    sampleRate,
    minFrequency = DEFAULT_MIN_FREQUENCY,
    maxFrequency = DEFAULT_MAX_FREQUENCY,
    threshold = DEFAULT_THRESHOLD,
    minRms = DEFAULT_MIN_RMS,
  }: PitchDetectionOptions
): PitchResult | null => {
  if (rootMeanSquare(buffer) < minRms) return null;

  // The lag (tau) is the candidate period in samples. Half the buffer is the
  // comparison window, so the longest period we can see is half the frame.
  const tauMin = Math.max(2, Math.floor(sampleRate / maxFrequency));
  const tauMax = Math.min(
    Math.floor(sampleRate / minFrequency),
    Math.floor(buffer.length / 2)
  );
  if (tauMax <= tauMin) return null;

  const windowSize = buffer.length - tauMax;

  // Steps 2 and 3: difference function, then cumulative mean normalization
  // (d'(0) = 1), which removes the bias towards tau = 0.
  const cmnd = new Float32Array(tauMax + 1);
  cmnd[0] = 1;
  let runningSum = 0;

  for (let tau = 1; tau <= tauMax; tau++) {
    let difference = 0;
    for (let i = 0; i < windowSize; i++) {
      const delta = buffer[i] - buffer[i + tau];
      difference += delta * delta;
    }

    runningSum += difference;
    cmnd[tau] = runningSum === 0 ? 1 : (difference * tau) / runningSum;
  }

  // Step 4: the first dip below the threshold, followed down to its local
  // minimum. Taking the first one (not the global minimum) avoids octave
  // errors where a multiple of the period scores slightly better.
  let tauEstimate = -1;
  for (let tau = tauMin; tau <= tauMax; tau++) {
    if (cmnd[tau] < threshold) {
      while (tau + 1 <= tauMax && cmnd[tau + 1] < cmnd[tau]) tau++;
      tauEstimate = tau;
      break;
    }
  }
  if (tauEstimate === -1) return null;

  // Step 5: parabolic interpolation around the dip for sub-sample precision.
  let refinedTau = tauEstimate;
  if (tauEstimate > 1 && tauEstimate < tauMax) {
    const previous = cmnd[tauEstimate - 1];
    const current = cmnd[tauEstimate];
    const next = cmnd[tauEstimate + 1];
    const denominator = previous + next - 2 * current;

    if (denominator !== 0) {
      refinedTau = tauEstimate + (previous - next) / (2 * denominator);
    }
  }

  return {
    frequency: sampleRate / refinedTau,
    clarity: Math.max(0, Math.min(1, 1 - cmnd[tauEstimate])),
  };
};

const NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as const;

type NoteName = (typeof NOTE_NAMES)[number];

type Note = {
  name: NoteName;
  octave: number;
  /** MIDI number of the nearest equal-tempered note (A4 = 69). */
  midi: number;
  /** Distance from that note, in cents (-50..+50). Positive is sharp. */
  cents: number;
  /** Exact frequency of the nearest note at the given reference pitch. */
  targetFrequency: number;
};

const A4_MIDI = 69;

const frequencyToNote = (frequency: number, referenceA4 = 440): Note | null => {
  if (!Number.isFinite(frequency) || frequency <= 0) return null;

  const exactMidi = A4_MIDI + 12 * Math.log2(frequency / referenceA4);
  const midi = Math.round(exactMidi);

  return {
    name: NOTE_NAMES[((midi % 12) + 12) % 12],
    octave: Math.floor(midi / 12) - 1,
    midi,
    cents: (exactMidi - midi) * 100,
    targetFrequency: referenceA4 * 2 ** ((midi - A4_MIDI) / 12),
  };
};

export { detectPitch, frequencyToNote, rootMeanSquare, NOTE_NAMES };
export type { Note, NoteName, PitchDetectionOptions, PitchResult };
