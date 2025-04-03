import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { Browser, Page } from "@playwright/test";
import mobileDriver from "../utils/mobile-driver";

export interface CustomWorld extends World {
  page?: Page;
  browser?: Browser;
  mobileDriver?: WebdriverIO.Browser;
  platform: "web" | "android" | "ios";
  setMobilePlatform(platform: "android" | "ios"): Promise<void>;
  result?: {
    status: "PASSED" | "FAILED" | "FLAKY" | "SKIPPED";
  };
}

class TestWorld extends World implements CustomWorld {
  page?: Page;
  browser?: Browser;
  mobileDriver?: WebdriverIO.Browser;
  platform: "web" | "android" | "ios" = "web";

  constructor(options: IWorldOptions) {
    super(options);
  }

  async setMobilePlatform(platform: "android" | "ios") {
    this.platform = platform;
    this.mobileDriver = await mobileDriver.initDriver(platform);
  }
}

setWorldConstructor(TestWorld);
