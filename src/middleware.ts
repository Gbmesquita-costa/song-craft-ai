import NextAuth from "next-auth";
import authConfig from "@/../auth.config";

import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_SIGNIN_REDIRECT,
  publicRoutes,
} from "../routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  // On a server/config error Auth.js sets `req.auth` to an error payload
  // instead of null, so only a session carrying a user counts as signed in.
  const isloggedIn = !!req.auth?.user;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isloggedIn) {
      return Response.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, nextUrl));
    }

    return null;
  }

  if (!isloggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/signin", nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
