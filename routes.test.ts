import { describe, expect, it } from "vitest";

import { getRouteRedirect } from "./routes";

describe("getRouteRedirect", () => {
  describe("signed out", () => {
    it("lets the landing page through", () => {
      expect(getRouteRedirect("/", false)).toBeNull();
    });

    it.each(["/signin", "/signup", "/forgot-password"])(
      "lets the auth page %s through",
      (pathname) => {
        expect(getRouteRedirect(pathname, false)).toBeNull();
      }
    );

    it.each([
      "/dashboard",
      "/dashboard/songs",
      "/dashboard/settings",
      "/some-unknown-page",
    ])("sends %s to /signin", (pathname) => {
      expect(getRouteRedirect(pathname, false)).toBe("/signin");
    });
  });

  describe("signed in", () => {
    it.each(["/signin", "/signup", "/forgot-password"])(
      "sends the auth page %s to the dashboard",
      (pathname) => {
        expect(getRouteRedirect(pathname, true)).toBe("/dashboard");
      }
    );

    it.each(["/", "/dashboard", "/dashboard/practice"])(
      "lets %s through",
      (pathname) => {
        expect(getRouteRedirect(pathname, true)).toBeNull();
      }
    );
  });

  it.each([false, true])(
    "never redirects Auth.js API routes (signed in: %s)",
    (isLoggedIn) => {
      expect(getRouteRedirect("/api/auth/session", isLoggedIn)).toBeNull();
      expect(getRouteRedirect("/api/auth/callback/credentials", isLoggedIn))
        .toBeNull();
    }
  );

  it("matches auth routes exactly, not by prefix", () => {
    expect(getRouteRedirect("/signin/extra", false)).toBe("/signin");
  });
});
