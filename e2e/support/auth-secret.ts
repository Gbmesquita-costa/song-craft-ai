// Throwaway secret shared by the e2e webServer (playwright.config.ts) and the
// session helper. It only signs sessions for the local test server.
const E2E_AUTH_SECRET = "e2e-only-secret-not-used-anywhere-else-0123456789";

export { E2E_AUTH_SECRET };
