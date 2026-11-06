// @vitest-environment jsdom
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { classifyMicrophoneError } from "./microphone-error";

import { Tuner } from ".";

const SAMPLE_RATE = 48_000;

const stopTrack = vi.fn();
const closeContext = vi.fn(() => Promise.resolve());
let toneFrequency = 440;

// Minimal stand-ins for the Web Audio API, which jsdom does not implement.
// The fake analyser hands the hook a pure sine wave at `toneFrequency`.
class FakeAudioContext {
  sampleRate = SAMPLE_RATE;
  resume = () => Promise.resolve();
  close = closeContext;
  createMediaStreamSource = () => ({ connect: () => undefined });
  createAnalyser = () => ({
    fftSize: 2048,
    getFloatTimeDomainData: (target: Float32Array) => {
      for (let i = 0; i < target.length; i++) {
        target[i] =
          0.5 * Math.sin((2 * Math.PI * toneFrequency * i) / SAMPLE_RATE);
      }
    },
  });
}

const fakeStream = { getTracks: () => [{ stop: stopTrack }] };

const mockGetUserMedia = (implementation: () => Promise<unknown>) =>
  vi.stubGlobal("navigator", {
    ...navigator,
    mediaDevices: { getUserMedia: vi.fn(implementation) },
  });

// Drives requestAnimationFrame by hand so each test controls time.
let frameCallbacks: FrameRequestCallback[] = [];
let clock = 0;
const runFrames = (count: number) => {
  for (let i = 0; i < count; i++) {
    clock += 100;
    const callbacks = frameCallbacks;
    frameCallbacks = [];
    act(() => callbacks.forEach((callback) => callback(clock)));
  }
};

beforeEach(() => {
  toneFrequency = 440;
  frameCallbacks = [];
  clock = 0;
  vi.stubGlobal("AudioContext", FakeAudioContext);
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    frameCallbacks.push(callback);
    return frameCallbacks.length;
  });
  vi.stubGlobal("cancelAnimationFrame", () => {
    frameCallbacks = [];
  });
  // jsdom has no canvas backend; the waveform simply is not drawn.
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  stopTrack.mockClear();
  closeContext.mockClear();
});

const startTuner = async () => {
  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: /ativar microfone/i }));
  });
};

describe("Tuner", () => {
  it("shows the detected note and cents for the microphone signal", async () => {
    mockGetUserMedia(() => Promise.resolve(fakeStream));
    render(<Tuner />);

    await startTuner();
    runFrames(3);

    expect(screen.getByTestId("tuner-note")).toHaveTextContent("A4");
    expect(screen.getByText(/440\.0 Hz · [+-]0 cents/)).toBeInTheDocument();
    expect(screen.getByText("Afinado")).toBeInTheDocument();
  });

  it("tells the player which way to go when the note is off", async () => {
    toneFrequency = 440 * 2 ** (30 / 1200); // 30 cents sharp
    mockGetUserMedia(() => Promise.resolve(fakeStream));
    render(<Tuner />);

    await startTuner();
    runFrames(3);

    expect(screen.getByText(/\+30 cents/)).toBeInTheDocument();
    expect(screen.getByText("Acima da nota (agudo)")).toBeInTheDocument();
  });

  it("releases the microphone when stopped", async () => {
    mockGetUserMedia(() => Promise.resolve(fakeStream));
    render(<Tuner />);

    await startTuner();
    fireEvent.click(screen.getByRole("button", { name: /parar afinador/i }));

    expect(stopTrack).toHaveBeenCalled();
    expect(closeContext).toHaveBeenCalled();
    expect(screen.getByTestId("tuner-note")).toHaveTextContent("—");
  });

  it("releases the microphone on unmount", async () => {
    mockGetUserMedia(() => Promise.resolve(fakeStream));
    const { unmount } = render(<Tuner />);

    await startTuner();
    unmount();

    expect(stopTrack).toHaveBeenCalled();
  });

  it("explains how to recover when permission is denied", async () => {
    mockGetUserMedia(() =>
      Promise.reject(new DOMException("Permission denied", "NotAllowedError"))
    );
    render(<Tuner />);

    await startTuner();

    expect(screen.getByRole("alert")).toHaveTextContent(
      /permissão do microfone negada/i
    );
    expect(closeContext).toHaveBeenCalled();
    expect(
      screen.getByRole("button", { name: /tentar de novo/i })
    ).toBeInTheDocument();
  });

  it("says so when the browser cannot access the microphone at all", async () => {
    vi.stubGlobal("navigator", { ...navigator, mediaDevices: undefined });
    render(<Tuner />);

    await startTuner();

    expect(screen.getByRole("alert")).toHaveTextContent(/https ou localhost/i);
  });
});

describe("classifyMicrophoneError", () => {
  it.each([
    ["NotAllowedError", "denied"],
    ["PermissionDeniedError", "denied"],
    ["NotFoundError", "no-microphone"],
    ["OverconstrainedError", "no-microphone"],
    ["SecurityError", "unsupported"],
    ["NotReadableError", "error"],
  ])("maps %s to %s", (name, expected) => {
    expect(classifyMicrophoneError(new DOMException("", name))).toBe(expected);
  });

  it.each([undefined, null, "boom", 42])(
    "treats %j as a generic error",
    (error) => {
      expect(classifyMicrophoneError(error)).toBe("error");
    }
  );
});
