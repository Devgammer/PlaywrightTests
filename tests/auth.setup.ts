import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

const testUser = {
  email: "dkolokhin+1@gmail.com",
  password: "Cypress8067",
};

setup("authenticate", async ({ page }) => {
  await page.goto("/");

  await page.locator('button:has-text("Sign In")').click();

  await page.locator("#signinEmail").fill(testUser.email);
  await page.locator("#signinPassword").fill(testUser.password);

  await page.locator('button:has-text("Login")').click();

  await expect(page).toHaveURL("/panel/garage");

  await page
    .context()
    .storageState({ path: "test-data/states/mainUserState.json" });
});
