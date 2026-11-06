import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

/**
 * Writes a 16-bit mono WAV with a harmonic-rich tone, for Chromium's
 * `--use-file-for-fake-audio-capture` fake microphone.
 */
const writeToneWav = (path: string, frequency: number, seconds = 10) => {
  const sampleRate = 48_000;
  const samples = sampleRate * seconds;
  const wav = Buffer.alloc(44 + samples * 2);

  wav.write("RIFF", 0);
  wav.writeUInt32LE(36 + samples * 2, 4);
  wav.write("WAVE", 8);
  wav.write("fmt ", 12);
  wav.writeUInt32LE(16, 16); // fmt chunk size
  wav.writeUInt16LE(1, 20); // PCM
  wav.writeUInt16LE(1, 22); // mono
  wav.writeUInt32LE(sampleRate, 24);
  wav.writeUInt32LE(sampleRate * 2, 28); // byte rate
  wav.writeUInt16LE(2, 32); // block align
  wav.writeUInt16LE(16, 34); // bits per sample
  wav.write("data", 36);
  wav.writeUInt32LE(samples * 2, 40);

  for (let i = 0; i < samples; i++) {
    let value = 0;
    for (let harmonic = 1; harmonic <= 5; harmonic++) {
      value +=
        Math.sin((2 * Math.PI * frequency * harmonic * i) / sampleRate) /
        harmonic;
    }
    wav.writeInt16LE(Math.round(value * 0.2 * 32_767), 44 + i * 2);
  }

  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, wav);
};

export { writeToneWav };
