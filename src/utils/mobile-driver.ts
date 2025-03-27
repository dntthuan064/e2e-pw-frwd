import { remote } from 'webdriverio';
import { ANDROID_CAPABILITIES, IOS_CAPABILITIES, APPIUM_SERVER } from '../config/appium.config';

class MobileDriverManager {
  private driver: WebdriverIO.Browser | null = null;
  private static instance: MobileDriverManager;

  private constructor() {}

  public static getInstance(): MobileDriverManager {
    if (!MobileDriverManager.instance) {
      MobileDriverManager.instance = new MobileDriverManager();
    }
    return MobileDriverManager.instance;
  }

  public async initDriver(platform: 'android' | 'ios'): Promise<WebdriverIO.Browser> {
    if (this.driver) {
      return this.driver;
    }

    const capabilities = platform === 'android' ? ANDROID_CAPABILITIES : IOS_CAPABILITIES;
    
    this.driver = await remote({
      ...APPIUM_SERVER,
      capabilities
    });

    return this.driver;
  }

  public getDriver(): WebdriverIO.Browser {
    if (!this.driver) {
      throw new Error('Driver not initialized. Call initDriver first.');
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

export default MobileDriverManager.getInstance(); 