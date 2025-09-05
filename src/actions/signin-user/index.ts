"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/../auth";

import { signinUserSchema } from "@/schemas/signin-user-schema";
import { DEFAULT_SIGNIN_REDIRECT } from "../../../routes";

const handleSigninUser = async (state: any, signinValues: FormData) => {
  const signinUserValues = Object.fromEntries(signinValues.entries());
  const signinValidation = signinUserSchema.safeParse(signinUserValues);

  if (signinValidation.error) {
    const formatError = signinValidation.error.flatten();

    return {
      signinUserError: formatError.fieldErrors,
    };
  }

  const { email, password } = signinValidation.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_SIGNIN_REDIRECT,
    });

    return {
      successMessage: true,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            signinUserError: {
              signinUserErrorMessage: "Credenciais inválidas!",
            },
          };
        default:
          return {
            signinUserError: {
              signinUserErrorMessage:
                "Ocorreu um erro inesperado ao tentar realizar o login. Por favor, tente novamente!",
            },
          };
      }
    }

    throw error;
  }
};

export { handleSigninUser };
