// "use server";

// import { forgotPasswordSchema } from "@/schemas/forgot-password-schema";
// import { UserRepository } from "@/repositories";

// const handleForgotPassword = async (
//   state: any,
//   forgotPasswordValues: FormData
// ) => {
//   const forgotPasswordUserValues = Object.fromEntries(
//     forgotPasswordValues.entries()
//   );
//   const forgotPasswordValidation = forgotPasswordSchema.safeParse(
//     forgotPasswordUserValues
//   );

//   if (forgotPasswordValidation.error) {
//     const formatError = forgotPasswordValidation.error.flatten();

//     return {
//       forgotPasswordError: formatError.fieldErrors,
//     };
//   }

//   const { email } = forgotPasswordValidation.data;

//   try {
//     // Verifica se o usuário existe
//     const existingUser = await UserRepository.findByEmail(email);

//     if (!existingUser) {
//       // Por segurança, não revelamos se o email existe ou não
//       // Retornamos sucesso mesmo se o usuário não existir
//       return {
//         successMessage:
//           "Se este email estiver cadastrado, você receberá um link de recuperação em breve.",
//       };
//     }

//     // TODO: Implementar envio de email real
//     // Aqui você integraria com um serviço de email como:
//     // - Resend
//     // - SendGrid
//     // - Amazon SES
//     // - Nodemailer

//     // Simulação do envio de email
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     console.log(`📧 Email de recuperação seria enviado para: ${email}`);
//     console.log(
//       `🔗 Link de recuperação: /reset-password?token=fake-token-${Date.now()}`
//     );

//     return {
//       successMessage:
//         "Se este email estiver cadastrado, você receberá um link de recuperação em breve.",
//     };
//   } catch (error) {
//     console.error("Erro ao processar recuperação de senha:", error);

//     return {
//       forgotPasswordError: {
//         forgotPasswordErrorMessage:
//           "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.",
//       },
//     };
//   }
// };

// export { handleForgotPassword };
