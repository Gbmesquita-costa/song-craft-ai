import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    // Mirror the `@/*` path alias from tsconfig.json.
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    // Pure logic runs in Node; component tests opt into jsdom with a
    // `// @vitest-environment jsdom` comment at the top of the file.
    environment: "node",
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules/**", ".next/**", "e2e/**"],
    setupFiles: ["./vitest.setup.ts"],
    restoreMocks: true,
    unstubEnvs: true,
  },
});
