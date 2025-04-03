import { test as base } from "@playwright/test";
import { BasePage } from "../pages/base.page";
import { LoginPage } from "../pages/login.page";
import { ScenarioData } from "./types/data";
import { TestConfig, TestContext } from "./types/common";

export type DataFixtures = {
  scenarioData: ScenarioData;
};

export type HooksFixtures = {
  testConfig: TestConfig;
  testContext: TestContext;
};

export type PageObjectFixtures = {
  basePage: BasePage;
  loginPage: LoginPage;
};

export const test = base.extend<
  DataFixtures & HooksFixtures & PageObjectFixtures
>({
  testConfig: async ({}, use) => {
    const config: TestConfig = {
      baseUrl: process.env.E2E_BASE_URL || "",
      portalUrl: process.env.E2E_PORTAL_URL || "",
      emailDomain: process.env.E2E_EMAIL_DOMAIN || "",
      lenderSubdomain: process.env.E2E_LENDER_SUBDOMAIN || "",
    };
    await use(config);
  },

  testContext: async ({ testConfig }, use) => {
    const context: TestContext = {
      config: testConfig,
      currentPage: "",
    };
    await use(context);
  },

  scenarioData: async ({}, use) => {
    await use(new ScenarioData());
  },

  basePage: async ({ page }, use) => {
    await use(new BasePage(page, ""));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});
