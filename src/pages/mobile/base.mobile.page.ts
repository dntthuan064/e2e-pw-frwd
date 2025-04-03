import mobileDriver from "../../utils/mobile-driver";

export default class BaseMobilePage {
  protected driver: WebdriverIO.Browser;

  constructor() {
    this.driver = mobileDriver.getDriver();
  }

  async tapElement(accessibilityId: string): Promise<void> {
    const element = await this.driver.$(`~${accessibilityId}`);
    await element.click();
  }

  async inputText(accessibilityId: string, text: string): Promise<void> {
    const element = await this.driver.$(`~${accessibilityId}`);
    await element.setValue(text);
  }

  async isElementDisplayed(accessibilityId: string): Promise<boolean> {
    const element = await this.driver.$(`~${accessibilityId}`);
    return element.isDisplayed();
  }

  async waitForElement(
    accessibilityId: string,
    timeout = 10000,
  ): Promise<void> {
    const element = await this.driver.$(`~${accessibilityId}`);
    await element.waitForDisplayed({ timeout });
  }
}
