import NextAuth from "next-auth";
import authConfig from "@/../auth.config";

import { getRouteRedirect } from "../routes";

const { auth } = NextAuth(authConfig);

export const proxy = auth((req) => {
  const { nextUrl } = req;
  // On a server/config error Auth.js sets `req.auth` to an error payload
  // instead of null, so only a session carrying a user counts as signed in.
  const isloggedIn = !!req.auth?.user;

  const redirectTo = getRouteRedirect(nextUrl.pathname, isloggedIn);
  if (redirectTo) {
    return Response.redirect(new URL(redirectTo, nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\.[\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
