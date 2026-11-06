const publicRoutes = ["/"];
const apiAuthPrefix = "/api/auth";

const authRoutes = ["/signin", "/signup", "/forgot-password"];
const DEFAULT_SIGNIN_REDIRECT = "/dashboard";
const SIGNIN_ROUTE = "/signin";

/**
 * Decides where a request should go based only on its path and whether the
 * visitor is signed in. Returns the path to redirect to, or `null` to let the
 * request through. Kept free of Next/Auth.js types so it can be unit-tested.
 */
const getRouteRedirect = (
  pathname: string,
  isLoggedIn: boolean
): string | null => {
  // Auth.js endpoints must always be reachable (sign-in, session, CSRF...).
  if (pathname.startsWith(apiAuthPrefix)) return null;

  // Signed-in users have no business on the sign-in/sign-up screens.
  if (authRoutes.includes(pathname)) {
    return isLoggedIn ? DEFAULT_SIGNIN_REDIRECT : null;
  }

  if (!isLoggedIn && !publicRoutes.includes(pathname)) return SIGNIN_ROUTE;

  return null;
};

export {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_SIGNIN_REDIRECT,
  SIGNIN_ROUTE,
  getRouteRedirect,
};
