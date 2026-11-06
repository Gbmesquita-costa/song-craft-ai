import { beforeEach, describe, expect, it, vi } from "vitest";

// env.ts validates process.env once, at import time, so every test stubs the
// variables first and then imports a fresh copy of the module.
const loadEnv = async () => (await import("./env")).env;

const VALID_SECRET = "a".repeat(32);
const VALID_DATABASE_URL =
  "postgresql://user:password@localhost:5432/song-craft?schema=public";

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv("SKIP_ENV_VALIDATION", "");
  vi.stubEnv("NODE_ENV", "test");
  vi.stubEnv("DATABASE_URL", VALID_DATABASE_URL);
  vi.stubEnv("AUTH_SECRET", VALID_SECRET);
});

describe("env", () => {
  it("parses a valid environment", async () => {
    const env = await loadEnv();

    expect(env).toMatchObject({
      NODE_ENV: "test",
      DATABASE_URL: VALID_DATABASE_URL,
      AUTH_SECRET: VALID_SECRET,
    });
  });

  it("accepts the short postgres:// scheme", async () => {
    vi.stubEnv("DATABASE_URL", "postgres://user@db:5432/app");

    await expect(loadEnv()).resolves.toBeDefined();
  });

  it("requires DATABASE_URL", async () => {
    vi.stubEnv("DATABASE_URL", undefined);

    await expect(loadEnv()).rejects.toThrow("DATABASE_URL is required.");
  });

  it("rejects a non-Postgres DATABASE_URL", async () => {
    vi.stubEnv("DATABASE_URL", "mysql://user@localhost:3306/app");

    await expect(loadEnv()).rejects.toThrow(
      "DATABASE_URL must be a postgresql:// connection string."
    );
  });

  it("requires AUTH_SECRET", async () => {
    vi.stubEnv("AUTH_SECRET", undefined);

    await expect(loadEnv()).rejects.toThrow("AUTH_SECRET is required.");
  });

  it("rejects an AUTH_SECRET shorter than 32 characters", async () => {
    vi.stubEnv("AUTH_SECRET", "too-short");

    await expect(loadEnv()).rejects.toThrow(
      "AUTH_SECRET must be at least 32 characters long."
    );
  });

  it("rejects the .env.example placeholder secret", async () => {
    vi.stubEnv("AUTH_SECRET", "replace-me-with-a-generated-secret");

    await expect(loadEnv()).rejects.toThrow(
      "AUTH_SECRET still has the .env.example placeholder."
    );
  });

  it("rejects an unknown NODE_ENV", async () => {
    vi.stubEnv("NODE_ENV", "staging");

    await expect(loadEnv()).rejects.toThrow("Invalid environment variables");
  });

  it("skips validation when SKIP_ENV_VALIDATION is set", async () => {
    vi.stubEnv("SKIP_ENV_VALIDATION", "true");
    vi.stubEnv("AUTH_SECRET", undefined);

    await expect(loadEnv()).resolves.toBeDefined();
  });
});
