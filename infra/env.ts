import { z } from "zod";

const AUTH_SECRET_PLACEHOLDER = "replace-me-with-a-generated-secret";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  DATABASE_URL: z
    .string({ error: "DATABASE_URL is required." })
    .regex(
      /^postgres(ql)?:\/\/.+/,
      "DATABASE_URL must be a postgresql:// connection string."
    ),
  AUTH_SECRET: z
    .string({
      error: "AUTH_SECRET is required. Generate one with `npx auth secret`.",
    })
    .min(32, "AUTH_SECRET must be at least 32 characters long.")
    .refine((value) => value !== AUTH_SECRET_PLACEHOLDER, {
      message:
        "AUTH_SECRET still has the .env.example placeholder. Generate one with `npx auth secret`.",
    }),
});

type Env = z.infer<typeof envSchema>;

// Escape hatch for tooling that needs to load the app without real secrets
// (e.g. a CI `next build`). Runtime code must never rely on it.
const skipValidation = ["1", "true"].includes(
  process.env.SKIP_ENV_VALIDATION ?? ""
);

const parseEnv = (): Env => {
  if (skipValidation) return process.env as unknown as Env;

  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    throw new Error(
      `Invalid environment variables (see .env.example):\n${z.prettifyError(
        result.error
      )}`
    );
  }

  return result.data;
};

const env = parseEnv();

export { env };
export type { Env };
