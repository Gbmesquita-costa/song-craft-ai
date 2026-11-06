"use client";

import { useCallback, useRef } from "react";

import { Mic, MicOff, Square } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { cn } from "@/lib/utils";

import { usePitchDetector, type TunerStatus } from "./use-pitch-detector";

const REFERENCE_A4 = 440;
// Within this many cents the note counts as in tune (about the limit most
// listeners can hear on a sustained note).
const IN_TUNE_CENTS = 5;
// The needle spans -50..+50 cents across a 90° arc.
const DEGREES_PER_CENT = 0.9;

const STATUS_MESSAGES: Partial<Record<TunerStatus, string>> = {
  starting: "Aguardando permissão do microfone…",
  denied:
    "Permissão do microfone negada. Libere o acesso no ícone de cadeado da barra de endereço e tente de novo.",
  "no-microphone": "Nenhum microfone foi encontrado neste dispositivo.",
  unsupported:
    "Este navegador não permite acessar o microfone aqui. Use um navegador atual em HTTPS ou localhost.",
  error: "Não foi possível acessar o microfone. Tente novamente.",
};

const ERROR_STATUSES: TunerStatus[] = [
  "denied",
  "no-microphone",
  "unsupported",
  "error",
];

const tuningTone = (cents: number) => {
  const distance = Math.abs(cents);
  if (distance <= IN_TUNE_CENTS) return "in-tune";
  if (distance <= 15) return "close";

  return "off";
};

const TONE_CLASSES = {
  "in-tune": "text-green-600",
  close: "text-yellow-600",
  off: "text-red-600",
} as const;

const NEEDLE_COLORS = {
  "in-tune": "#16a34a",
  close: "#ca8a04",
  off: "#dc2626",
} as const;

const drawWaveform = (canvas: HTMLCanvasElement, samples: Float32Array) => {
  const context = canvas.getContext("2d");
  if (!context) return;

  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth * ratio;
  const height = canvas.clientHeight * ratio;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  context.clearRect(0, 0, width, height);
  context.lineWidth = 2 * ratio;
  context.strokeStyle = "#8b5cf6";
  context.beginPath();

  // Only the first quarter of the frame: a few periods read better than 40 ms.
  const visible = Math.floor(samples.length / 4);
  for (let i = 0; i < visible; i++) {
    const x = (i / (visible - 1)) * width;
    const y = height / 2 - samples[i] * (height / 2) * 0.9;
    if (i === 0) context.moveTo(x, y);
    else context.lineTo(x, y);
  }

  context.stroke();
};

const TICKS = Array.from({ length: 11 }, (_, i) => -50 + i * 10);

const Tuner = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFrame = useCallback((samples: Float32Array) => {
    if (canvasRef.current) drawWaveform(canvasRef.current, samples);
  }, []);

  const { status, reading, start, stop } = usePitchDetector({
    referenceA4: REFERENCE_A4,
    onFrame: handleFrame,
  });

  const listening = status === "listening";
  const cents = reading ? Math.max(-50, Math.min(50, reading.note.cents)) : 0;
  const tone = reading ? tuningTone(reading.note.cents) : null;
  const message = STATUS_MESSAGES[status];
  const isError = ERROR_STATUSES.includes(status);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <Mic className="w-5 h-5" />
            <span>Afinador</span>
          </span>
          <span className="text-xs font-normal text-gray-500">
            A4 = {REFERENCE_A4} Hz
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center" aria-live="polite">
          <div
            className={cn(
              "text-5xl font-bold tabular-nums",
              tone ? TONE_CLASSES[tone] : "text-gray-300"
            )}
            data-testid="tuner-note"
          >
            {reading ? (
              <>
                {reading.note.name}
                <sub className="text-2xl">{reading.note.octave}</sub>
              </>
            ) : (
              "—"
            )}
          </div>
          <div className="text-sm text-gray-600 tabular-nums h-5">
            {reading
              ? `${reading.frequency.toFixed(1)} Hz · ${
                  reading.note.cents >= 0 ? "+" : ""
                }${reading.note.cents.toFixed(0)} cents`
              : listening
              ? "Toque ou cante uma nota"
              : ""}
          </div>
          <div
            className={cn(
              "text-sm font-medium h-5",
              tone && TONE_CLASSES[tone]
            )}
          >
            {tone === "in-tune"
              ? "Afinado"
              : reading && reading.note.cents > 0
              ? "Acima da nota (agudo)"
              : reading
              ? "Abaixo da nota (grave)"
              : ""}
          </div>
        </div>

        <svg
          viewBox="0 0 200 115"
          className="w-full"
          role="img"
          aria-label={
            reading
              ? `Ponteiro em ${cents.toFixed(0)} cents`
              : "Ponteiro do afinador"
          }
        >
          <path
            d="M 31.1 52.1 A 90 90 0 0 1 168.9 52.1"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {TICKS.map((tick) => (
            <line
              key={tick}
              x1="100"
              y1={tick === 0 ? 12 : 17}
              x2="100"
              y2="27"
              stroke={tick === 0 ? "#16a34a" : "#9ca3af"}
              strokeWidth={tick === 0 ? 3 : 1.5}
              transform={`rotate(${tick * DEGREES_PER_CENT} 100 110)`}
            />
          ))}
          <line
            x1="100"
            y1="110"
            x2="100"
            y2="30"
            stroke={tone ? NEEDLE_COLORS[tone] : "#d1d5db"}
            strokeWidth="3"
            strokeLinecap="round"
            style={{
              transform: `rotate(${cents * DEGREES_PER_CENT}deg)`,
              transformOrigin: "100px 110px",
              transition: "transform 120ms ease-out",
            }}
          />
          <circle cx="100" cy="110" r="5" fill="#374151" />
        </svg>

        <canvas
          ref={canvasRef}
          className={cn(
            "w-full h-16 rounded-md bg-purple-50",
            !listening && "opacity-40"
          )}
          aria-hidden="true"
        />

        {message && (
          <p
            role={isError ? "alert" : "status"}
            className={cn(
              "text-sm rounded-md p-3",
              isError
                ? "bg-red-50 border border-red-200 text-red-700"
                : "bg-gray-50 text-gray-600"
            )}
          >
            {message}
          </p>
        )}

        {listening ? (
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={stop}
          >
            <Square className="w-4 h-4 mr-2" />
            Parar afinador
          </Button>
        ) : (
          <Button
            type="button"
            className="w-full"
            onClick={start}
            disabled={status === "starting"}
          >
            {isError ? (
              <MicOff className="w-4 h-4 mr-2" />
            ) : (
              <Mic className="w-4 h-4 mr-2" />
            )}
            {isError ? "Tentar de novo" : "Ativar microfone"}
          </Button>
        )}

        <p className="text-xs text-gray-500">
          O áudio é analisado só no seu navegador: nada é gravado nem enviado.
        </p>
      </CardContent>
    </Card>
  );
};

export { Tuner };
