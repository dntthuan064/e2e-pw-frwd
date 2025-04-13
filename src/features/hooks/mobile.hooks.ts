import { Before, After, BeforeAll, AfterAll } from "@cucumber/cucumber";
import pwMobileDriver from "../../utils/pw-mobile-driver";
import type { Driver } from "../../lib/pw-driver";
import { CustomWorld } from "../../common/world";

BeforeAll(async function () {
  console.log("Starting mobile testing session");
});

Before({ tags: "@android" }, async function (this: CustomWorld) {
  await this.setMobilePlatform("android");
});

Before({ tags: "@ios" }, async function (this: CustomWorld) {
  await this.setMobilePlatform("ios");
});

After(async function (this: CustomWorld) {
  // Take screenshot on failure
  if (this.result?.status === "FAILED" && this.mobileDriver) {
    const screenshot = await this.mobileDriver.getScreenshot();
    this.attach(screenshot, "image/png");
  }
});

AfterAll(async function () {
  await pwMobileDriver.closeDriver();
  console.log("Ended mobile testing session");
});
