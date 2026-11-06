import { expect, test } from "@playwright/test";

test.describe("landing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the hero and the main sections", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /qualquer música em sua próxima lição/,
      })
    ).toBeVisible();

    for (const id of ["demo", "features", "pricing"]) {
      await expect(page.locator(`section#${id}`)).toBeAttached();
    }
  });

  test("header links jump to the page sections", async ({ page }) => {
    const nav = page.getByRole("navigation").first();

    await expect(nav.getByRole("link", { name: "Como Funciona" })).toHaveAttribute(
      "href",
      "#demo"
    );
    await expect(nav.getByRole("link", { name: "Features" })).toHaveAttribute(
      "href",
      "#features"
    );
    await expect(nav.getByRole("link", { name: "Preços" })).toHaveAttribute(
      "href",
      "#pricing"
    );
  });

  test("navigates to the sign-in page", async ({ page }) => {
    await page.getByRole("link", { name: "Entrar", exact: true }).click();

    await expect(page).toHaveURL("/signin");
    await expect(
      page.getByRole("heading", { name: "Entrar no SongCraft AI" })
    ).toBeVisible();
  });

  test("navigates to the sign-up page", async ({ page }) => {
    await page.getByRole("link", { name: "Começar Grátis" }).first().click();

    await expect(page).toHaveURL("/signup");
    await expect(
      page.getByRole("heading", { name: "Criar conta no SongCraft AI" })
    ).toBeVisible();
  });
});
