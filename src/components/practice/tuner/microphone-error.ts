type MicrophoneFailure = "denied" | "no-microphone" | "unsupported" | "error";

// Maps a getUserMedia rejection to something the UI can explain.
// https://developer.mozilla.org/docs/Web/API/MediaDevices/getUserMedia#exceptions
const classifyMicrophoneError = (error: unknown): MicrophoneFailure => {
  const name =
    typeof error === "object" && error !== null && "name" in error
      ? String(error.name)
      : "";

  switch (name) {
    case "NotAllowedError":
    case "PermissionDeniedError": // older Chromium name
      return "denied";
    case "NotFoundError":
    case "DevicesNotFoundError": // older Chromium name
    case "OverconstrainedError":
      return "no-microphone";
    case "SecurityError":
    case "TypeError": // e.g. insecure context in some browsers
      return "unsupported";
    default:
      return "error";
  }
};

export { classifyMicrophoneError };
export type { MicrophoneFailure };
