"use server";

import { hash } from "bcryptjs";
import { db } from "@/../infra/database";

import { signupUserSchema } from "@/schemas/signup-user-schema";
import { getUserByEmail } from "@/repositories/user";

const handleSignUpUser = async (state: any, signUpValues: FormData) => {
  const signupUserValues = Object.fromEntries(signUpValues.entries());
  const signupValidation = signupUserSchema.safeParse(signupUserValues);

  if (signupValidation.error) {
    const formatError = signupValidation.error.flatten();

    return {
      signupUserError: formatError.fieldErrors,
    };
  }

  const { email, name, confirmPassword } = signupValidation.data;

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return {
        signupUserError: {
          email: ["Este email já está em uso."],
        },
      };
    }

    const hashedPassword = await hash(confirmPassword, 10);
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      successMessage: "Conta criada com sucesso!",
    };
  } catch (error) {
    return {
      signupUserError: {
        signUpUserErrorMessage:
          "Ocorreu um erro inesperado ao tentar realizar a criação da conta. Por favor, tente novamente!",
      },
    };
  }
};

export { handleSignUpUser };
