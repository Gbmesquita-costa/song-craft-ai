import { expect, test } from "@playwright/test";

test.describe("protected routes", () => {
  for (const path of ["/dashboard", "/dashboard/songs", "/dashboard/settings"]) {
    test(`${path} redirects signed-out visitors to /signin`, async ({
      page,
    }) => {
      await page.goto(path);

      await expect(page).toHaveURL("/signin");
      await expect(
        page.getByRole("heading", { name: "Entrar no SongCraft AI" })
      ).toBeVisible();
    });
  }

  test("auth pages stay reachable while signed out", async ({ page }) => {
    for (const path of ["/signin", "/signup", "/forgot-password"]) {
      const response = await page.goto(path);

      expect(response?.status()).toBe(200);
      await expect(page).toHaveURL(path);
    }
  });
});
