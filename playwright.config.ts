import { defineConfig, devices } from "@playwright/test";

import { E2E_AUTH_SECRET } from "./e2e/support/auth-secret";

const PORT = 3100;
const baseURL = `http://localhost:${PORT}`;

/**
 * End-to-end tests against a production build (`next build` + `next start`).
 *
 * The suite never needs a real database: it covers pages, server action
 * paths that fail validation before Prisma is used, and signed-in UI reached
 * with a JWT session cookie (e2e/support/session.ts). DATABASE_URL
 * points at a closed port on purpose, so any accidental query fails loudly
 * instead of touching a developer's local data.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `yarn build && yarn start --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
    env: {
      NODE_ENV: "production",
      DATABASE_URL: "postgresql://e2e:e2e@127.0.0.1:1/e2e?schema=public",
      AUTH_SECRET: E2E_AUTH_SECRET,
      AUTH_TRUST_HOST: "true",
    },
  },
});
