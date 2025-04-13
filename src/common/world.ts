import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { Browser, Page } from "@playwright/test";
import Driver from "../lib/pw-driver";
import pwMobileDriver from "../utils/pw-mobile-driver";

export interface CustomWorld extends World {
  page?: Page;
  browser?: Browser;
  mobileDriver?: Driver;
  platform: "web" | "android" | "ios";
  setMobilePlatform(platform: "android" | "ios"): Promise<void>;
  result?: {
    status: "PASSED" | "FAILED" | "FLAKY" | "SKIPPED";
  };
}

class TestWorld extends World implements CustomWorld {
  page?: Page;
  browser?: Browser;
  mobileDriver?: Driver;
  platform: "web" | "android" | "ios" = "web";

  constructor(options: IWorldOptions) {
    super(options);
  }

  async setMobilePlatform(platform: "android" | "ios") {
    this.platform = platform;
    this.mobileDriver = await pwMobileDriver.initDriver(platform);
  }
}

setWorldConstructor(TestWorld);
