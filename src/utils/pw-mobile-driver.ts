import Driver from "../lib/pw-driver";
import {
  ANDROID_CAPABILITIES,
  IOS_CAPABILITIES,
  APPIUM_SERVER,
} from "../config/appium.config";

class PWMobileDriverManager {
  private driver: Driver | null = null;
  private static instance: PWMobileDriverManager;

  private constructor() {}

  public static getInstance(): PWMobileDriverManager {
    if (!PWMobileDriverManager.instance) {
      PWMobileDriverManager.instance = new PWMobileDriverManager();
    }
    return PWMobileDriverManager.instance;
  }

  public async initDriver(platform: "android" | "ios"): Promise<Driver> {
    if (this.driver) {
      return this.driver;
    }

    this.driver = new Driver();

    const capabilities = {
      ...(platform === "android" ? ANDROID_CAPABILITIES : IOS_CAPABILITIES),
      ...APPIUM_SERVER,
      platformName: platform,
      automationName: "playwright",
    };

    await this.driver.createSession({
      alwaysMatch: capabilities,
      firstMatch: [],
    });
    return this.driver;
  }

  public getDriver(): Driver {
    if (!this.driver) {
      throw new Error("Driver not initialized. Call initDriver first.");
    }
    return this.driver;
  }

  public async closeDriver(): Promise<void> {
    if (this.driver) {
      await this.driver.deleteSession();
      this.driver = null;
    }
  }
}

export default PWMobileDriverManager.getInstance();
