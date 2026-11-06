import { describe, expect, it } from "vitest";

import { signupUserSchema } from ".";

const validInput = {
  email: "ana@example.com",
  name: "Ana Silva",
  password: "s3nha-forte",
  confirmPassword: "s3nha-forte",
};

const fieldErrors = (overrides: Partial<typeof validInput>) => {
  const result = signupUserSchema.safeParse({ ...validInput, ...overrides });
  if (result.success) throw new Error("expected validation to fail");
  return result.error.flatten().fieldErrors;
};

describe("signupUserSchema", () => {
  it("accepts a valid sign-up", () => {
    expect(signupUserSchema.safeParse(validInput).success).toBe(true);
  });

  it("normalizes the e-mail to avoid duplicate accounts by case", () => {
    const result = signupUserSchema.parse({
      ...validInput,
      email: " ANA@Example.com",
    });

    expect(result.email).toBe("ana@example.com");
  });

  it("rejects a malformed e-mail", () => {
    expect(fieldErrors({ email: "ana.example.com" }).email).toContain(
      "O e-mail informado não é válido."
    );
  });

  describe("name", () => {
    it.each([
      ["Maria", "Por favor, insira o nome de usuário completo."],
      [
        "Ana  Silva",
        "O nome de usuário não deve conter espaços consecutivos.",
      ],
      [
        " Ana Silva",
        "O nome de usuário não pode começar ou terminar com espaço em branco.",
      ],
      [
        "Ana Silva ",
        "O nome de usuário não pode começar ou terminar com espaço em branco.",
      ],
      [
        "@Ana Silva",
        "O nome de usuário deve começar e terminar com letra ou número; símbolos (ex.: @, _, -, .) só são permitidos no meio.",
      ],
      [
        `Ana ${"a".repeat(100)}`,
        "O nome de usuário não deve exceder 100 caracteres.",
      ],
    ])("rejects %j", (name, message) => {
      expect(fieldErrors({ name }).name).toEqual([message]);
    });

    it.each(["José da Silva", "Ana O'Neil", "João Silva-Souza 2º"])(
      "accepts %j",
      (name) => {
        expect(
          signupUserSchema.safeParse({ ...validInput, name }).success
        ).toBe(true);
      }
    );
  });

  describe("password", () => {
    it("rejects passwords shorter than 7 characters", () => {
      expect(
        fieldErrors({ password: "abc123", confirmPassword: "abc123" }).password
      ).toContain("A senha deve ter pelo menos 7 caracteres.");
    });

    it("rejects passwords containing spaces", () => {
      expect(
        fieldErrors({ password: "abc 1234", confirmPassword: "abc 1234" })
          .password
      ).toEqual(["A senha não deve conter espaços."]);
    });

    it("reports a mismatched confirmation on confirmPassword", () => {
      const errors = fieldErrors({ confirmPassword: "outra-senha" });

      expect(errors.confirmPassword).toEqual(["As senhas não coincidem"]);
      expect(errors.password).toBeUndefined();
    });
  });
});
