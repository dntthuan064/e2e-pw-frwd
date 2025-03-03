import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { DASHBOARD_PAGE } from "../../common/enum";

Given("I am on the login page", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  const isVisible = await loginPage.isLoginFormVisible();
  expect(isVisible).toBeTruthy();
});

When("I enter {string} as email", async ({ page }, email: string) => {
  const loginPage = new LoginPage(page);
  await loginPage.emailInput.fill(email);
});

When("I enter {string} as password", async ({ page }, password: string) => {
  const loginPage = new LoginPage(page);
  await loginPage.passwordInput.fill(password);
});

When("I click the login button", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginButton.click();
});

Then("I should be redirected to the dashboard", async ({ page }) => {
  await page.waitForURL("**/dashboard");
  expect(page.url()).toContain(DASHBOARD_PAGE.PATH);
});

Then("I should see my dashboard content", async ({ page }) => {
  const title = await page.title();
  expect(title).toBe(DASHBOARD_PAGE.TITLE);
});

Then("I should see an error message", async ({ page }) => {
  const errorMessage = await page.locator(".error-message").textContent();
  expect(errorMessage).toBeTruthy();
});

Then("I should remain on the login page", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const isVisible = await loginPage.isLoginFormVisible();
  expect(isVisible).toBeTruthy();
});
