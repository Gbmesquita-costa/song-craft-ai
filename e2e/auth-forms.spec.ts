import { expect, test, type Page } from "@playwright/test";

// Every submission here fails schema validation inside the server action,
// which returns before any database access.

test.describe("sign-in form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/signin");
  });

  test("shows required-field errors on an empty submit", async ({ page }) => {
    await page.getByRole("button", { name: "Entrar" }).click();

    await expect(page.getByText("O e-mail é obrigatório.")).toBeVisible();
    await expect(
      page.getByText("A senha deve ter pelo menos 7 caracteres.")
    ).toBeVisible();
  });

  test("rejects a password that is too short", async ({ page }) => {
    await page.getByPlaceholder("seu@email.com").fill("ana@example.com");
    await page.getByPlaceholder("Sua senha").fill("123");
    await page.getByRole("button", { name: "Entrar" }).click();

    await expect(
      page.getByText("A senha deve ter pelo menos 7 caracteres.")
    ).toBeVisible();
    await expect(page.getByText("O e-mail é obrigatório.")).toBeHidden();
  });

  test("the Google button does not submit the e-mail form", async ({
    page,
  }) => {
    // Social login is not implemented; the button must not fall back to
    // submitting the e-mail/password server action.
    const postRequests: string[] = [];
    page.on("request", (request) => {
      if (request.method() === "POST") postRequests.push(request.url());
    });

    await page.getByRole("button", { name: "Continuar com Google" }).click();
    // Give a (wrong) form submission time to reach the server.
    await page.waitForTimeout(1_000);

    expect(postRequests).toEqual([]);
    await expect(page.getByText("O e-mail é obrigatório.")).toBeHidden();
  });
});

test.describe("sign-up form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/signup");
  });

  const fillForm = async (
    page: Page,
    values: { name: string; email: string; password: string; confirm: string }
  ) => {
    await page.locator("#name").fill(values.name);
    await page.locator("#email").fill(values.email);
    await page.locator("#password").fill(values.password);
    await page.locator("#confirmPassword").fill(values.confirm);
    await page.getByRole("button", { name: "Criar conta gratuita" }).click();
  };

  test("asks for the full name", async ({ page }) => {
    await fillForm(page, {
      name: "Ana",
      email: "ana@example.com",
      password: "s3nha-forte",
      confirm: "s3nha-forte",
    });

    await expect(
      page.getByText("Por favor, insira o nome de usuário completo.")
    ).toBeVisible();
  });

  test("reports mismatched passwords", async ({ page }) => {
    await fillForm(page, {
      name: "Ana Silva",
      email: "ana@example.com",
      password: "s3nha-forte",
      confirm: "outra-senha",
    });

    await expect(page.getByText("As senhas não coincidem")).toBeVisible();
  });

  test("rejects passwords containing spaces", async ({ page }) => {
    await fillForm(page, {
      name: "Ana Silva",
      email: "ana@example.com",
      password: "senha com espaço",
      confirm: "senha com espaço",
    });

    await expect(
      page.getByText("A senha não deve conter espaços.")
    ).toBeVisible();
  });
});
