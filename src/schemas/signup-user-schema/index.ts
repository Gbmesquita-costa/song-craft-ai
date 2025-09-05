import { z } from "zod";

const hasSpaceAtEdges = (value: string) => /^\s|\s$/.test(value);
const hasConsecutiveSpaces = (value: string): boolean => /\s{2,}/.test(value);

const signupUserSchema = z
  .object({
    email: z
      .string()
      .min(1, "O e-mail é obrigatório.")
      .email("O e-mail informado não é válido.")
      .max(100, "O e-mail deve ter no máximo 100 caracteres."),
    name: z.string().superRefine((value, ctx) => {
      if (value.length > 100) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "O nome de usuário não deve exceder 100 caracteres.",
        });
        return;
      }

      if (hasConsecutiveSpaces(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "O nome de usuário não deve conter espaços consecutivos.",
        });
        return;
      }

      if (hasSpaceAtEdges(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "O nome de usuário não pode começar ou terminar com espaço em branco.",
        });
        return;
      }

      if (!/^\S+ \S+(?: \S+)*$/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Por favor, insira o nome de usuário completo.",
        });
        return;
      }

      const regex = /^(?=[\p{L}\p{N}])[ \p{L}\p{N}\p{P}]*(?<=[\p{L}\p{N}])$/u;
      if (!regex.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "O nome de usuário deve começar e terminar com letra ou número; símbolos (ex.: @, _, -, .) só são permitidos no meio.",
        });
      }
    }),
    password: z
      .string()
      .min(7, "A senha deve ter pelo menos 7 caracteres.")
      .max(100, "A senha deve ter no máximo 100 caracteres.")
      .refine((value) => !/\s/.test(value), {
        message: "A senha não deve conter espaços.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export { signupUserSchema };
