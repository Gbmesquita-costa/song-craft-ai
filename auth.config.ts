import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { compare } from "bcryptjs";

import { signinUserSchema } from "@/schemas/signin-user-schema";
import { getUserByEmail } from "@/repositories/user";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = signinUserSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await compare(password, user.password);
          if (passwordMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
