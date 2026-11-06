import { compare } from "bcryptjs";

import { signinUserSchema } from "@/schemas/signin-user-schema";
import { getUserByEmail } from "@/repositories/user";

// Credentials check behind the Auth.js `authorize` callback. Kept outside
// auth.config.ts so it can be unit-tested without booting Auth.js.
const authorizeCredentials = async (credentials: unknown) => {
  const validatedFields = signinUserSchema.safeParse(credentials);
  if (!validatedFields.success) return null;

  const { email, password } = validatedFields.data;

  const user = await getUserByEmail(email);
  if (!user || !user.password) return null;

  const passwordMatch = await compare(password, user.password);
  if (!passwordMatch) return null;

  // Hand Auth.js only the public profile, never the password hash.
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
  };
};

export { authorizeCredentials };
