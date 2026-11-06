import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { authorizeCredentials } from "@/lib/auth/authorize-credentials";

export default {
  providers: [
    Credentials({
      authorize: authorizeCredentials,
    }),
  ],
} satisfies NextAuthConfig;
