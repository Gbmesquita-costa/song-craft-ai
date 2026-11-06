"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { detectPitch, frequencyToNote, type Note } from "@/lib/audio/pitch";

import {
  classifyMicrophoneError,
  type MicrophoneFailure,
} from "./microphone-error";

type TunerStatus = "idle" | "starting" | "listening" | MicrophoneFailure;

type PitchReading = {
  frequency: number;
  note: Note;
};

type UsePitchDetectorOptions = {
  referenceA4?: number;
  /** Called with every raw audio frame, e.g. to draw a waveform. */
  onFrame?: (samples: Float32Array) => void;
};

// 2048 samples is ~43 ms at 48 kHz. YIN compares half of the frame with
// itself, so the lowest pitch it can see is ~47 Hz: below the 60 Hz floor
// used by detectPitch, which covers a guitar or bass tuned to standard.
const FRAME_SIZE = 2048;
// React state is updated at most this often; detection runs every frame.
const UI_UPDATE_MS = 60;
// Keep showing the last note this long after the sound stops, so the
// display does not blank out between plucks.
const HOLD_MS = 600;
// The median of the last few estimates removes single-frame outliers.
const SMOOTHING_WINDOW = 5;

const median = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  return sorted.length % 2
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2;
};

const usePitchDetector = ({
  referenceA4 = 440,
  onFrame,
}: UsePitchDetectorOptions = {}) => {
  const [status, setStatus] = useState<TunerStatus>("idle");
  const [reading, setReading] = useState<PitchReading | null>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const frameRef = useRef<number | null>(null);
  // Bumped on every start/stop, so a permission prompt that resolves after
  // the user pressed stop (or left the page) does not start a stale session.
  const sessionRef = useRef(0);
  const onFrameRef = useRef(onFrame);
  const referenceRef = useRef(referenceA4);

  useEffect(() => {
    onFrameRef.current = onFrame;
    referenceRef.current = referenceA4;
  }, [onFrame, referenceA4]);

  const release = useCallback(() => {
    sessionRef.current += 1;

    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;

    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    contextRef.current?.close().catch(() => undefined);
    contextRef.current = null;
  }, []);

  const stop = useCallback(() => {
    release();
    setReading(null);
    setStatus("idle");
  }, [release]);

  const start = useCallback(async () => {
    release();
    setReading(null);

    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices?.getUserMedia ||
      typeof AudioContext === "undefined"
    ) {
      setStatus("unsupported");
      return;
    }

    const session = sessionRef.current;
    setStatus("starting");

    // Created inside the click handler, before the permission prompt, so the
    // browser's autoplay policy sees the user gesture.
    const context = new AudioContext();
    contextRef.current = context;

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        // Voice-call processing distorts pitch; the tuner needs the raw signal.
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });
    } catch (error) {
      if (session !== sessionRef.current) return;

      release();
      setStatus(classifyMicrophoneError(error));
      return;
    }

    if (session !== sessionRef.current) {
      stream.getTracks().forEach((track) => track.stop());
      return;
    }

    streamRef.current = stream;
    await context.resume().catch(() => undefined);

    const analyser = context.createAnalyser();
    analyser.fftSize = FRAME_SIZE;
    context.createMediaStreamSource(stream).connect(analyser);

    const samples = new Float32Array(analyser.fftSize);
    const recent: number[] = [];
    let lastUiUpdate = -Infinity;
    let lastPitchAt = -Infinity;

    const tick = (now: number) => {
      analyser.getFloatTimeDomainData(samples);
      onFrameRef.current?.(samples);

      const result = detectPitch(samples, { sampleRate: context.sampleRate });
      if (result) {
        recent.push(result.frequency);
        if (recent.length > SMOOTHING_WINDOW) recent.shift();
        lastPitchAt = now;
      } else if (now - lastPitchAt > HOLD_MS) {
        recent.length = 0;
      }

      if (now - lastUiUpdate >= UI_UPDATE_MS) {
        lastUiUpdate = now;

        const frequency = recent.length ? median(recent) : null;
        const note = frequency
          ? frequencyToNote(frequency, referenceRef.current)
          : null;

        setReading(frequency && note ? { frequency, note } : null);
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    setStatus("listening");
    frameRef.current = requestAnimationFrame(tick);
  }, [release]);

  // Release the microphone when the component unmounts.
  useEffect(() => release, [release]);

  return { status, reading, start, stop };
};

export { usePitchDetector };
export type { PitchReading, TunerStatus };
