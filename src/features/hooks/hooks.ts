import { Before, After, BeforeAll, AfterAll } from "@cucumber/cucumber";
import { chromium, Browser } from "@playwright/test";
import mobileDriver from "../../utils/mobile-driver";
import { CustomWorld } from "../../common/world";

// Initialize based on platform
BeforeAll(async function () {
  console.log("Starting test session");
});

// Web hooks
Before({ tags: "@web" }, async function (this: CustomWorld) {
  this.platform = "web";
  this.browser = await chromium.launch({ headless: false });
  const context = await this.browser.newContext();
  this.page = await context.newPage();
});

// Android hooks
Before({ tags: "@android" }, async function (this: CustomWorld) {
  await this.setMobilePlatform("android");
});

// iOS hooks
Before({ tags: "@ios" }, async function (this: CustomWorld) {
  await this.setMobilePlatform("ios");
});

// Cleanup after scenarios
After(async function (this: CustomWorld) {
  if (this.platform === "web" && this.browser) {
    await this.browser.close();
  }

  // Take screenshot on failure or flaky
  if (this.result?.status === "FAILED" || "FLAKY") {
    if (this.platform === "web" && this.page) {
      const screenshot = await this.page.screenshot();
      this.attach(screenshot, "image/png");
    } else if (this.mobileDriver) {
      const screenshot = await this.mobileDriver.takeScreenshot();
      this.attach(screenshot, "image/png");
    }
  }
});

AfterAll(async function () {
  // Close any remaining mobile sessions
  await mobileDriver.closeDriver();
  console.log("Test session ended");
});
