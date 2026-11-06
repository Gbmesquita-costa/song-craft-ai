import type { BrowserContext } from "@playwright/test";
import { encode } from "next-auth/jwt";

import { E2E_AUTH_SECRET } from "./auth-secret";

const SESSION_COOKIE = "authjs.session-token";

/**
 * Signs the visitor in without a database: the proxy only verifies the
 * Auth.js JWT, and the `jwt` callback's user lookup fails soft when
 * Postgres is unreachable. Use it for UI that sits behind the proxy, not to
 * test the sign-in flow itself.
 */
const signInWithSessionCookie = async (
  context: BrowserContext,
  baseURL: string
) => {
  const token = await encode({
    token: { sub: "e2e-user", name: "E2E", email: "e2e@example.com" },
    secret: E2E_AUTH_SECRET,
    salt: SESSION_COOKIE,
  });

  await context.addCookies([
    { name: SESSION_COOKIE, value: token, url: baseURL },
  ]);
};

export { signInWithSessionCookie };
