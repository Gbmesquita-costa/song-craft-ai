import { describe, expect, it } from "vitest";

import { signinUserSchema } from ".";

const fieldErrors = (input: unknown) => {
  const result = signinUserSchema.safeParse(input);
  if (result.success) throw new Error("expected validation to fail");
  return result.error.flatten().fieldErrors;
};

describe("signinUserSchema", () => {
  it("accepts valid credentials", () => {
    const result = signinUserSchema.safeParse({
      email: "ana@example.com",
      password: "s3nha-forte",
    });

    expect(result.success).toBe(true);
  });

  it("normalizes the e-mail so lookups match regardless of case", () => {
    const result = signinUserSchema.parse({
      email: "  Ana.Silva@Example.COM ",
      password: "s3nha-forte",
    });

    expect(result.email).toBe("ana.silva@example.com");
  });

  it("requires an e-mail", () => {
    expect(fieldErrors({ email: "", password: "s3nha-forte" }).email).toContain(
      "O e-mail é obrigatório."
    );
  });

  it("rejects a malformed e-mail", () => {
    expect(
      fieldErrors({ email: "ana@", password: "s3nha-forte" }).email
    ).toContain("O e-mail informado não é válido.");
  });

  it("rejects passwords shorter than 7 characters", () => {
    expect(
      fieldErrors({ email: "ana@example.com", password: "123456" }).password
    ).toEqual(["A senha deve ter pelo menos 7 caracteres."]);
  });

  it("rejects passwords longer than 100 characters", () => {
    expect(
      fieldErrors({ email: "ana@example.com", password: "a".repeat(101) })
        .password
    ).toEqual(["A senha deve ter no máximo 100 caracteres."]);
  });

  it("rejects missing fields", () => {
    const errors = fieldErrors({});

    expect(errors.email).toBeDefined();
    expect(errors.password).toBeDefined();
  });
});
