import pwMobileDriver from "../../utils/pw-mobile-driver";
import type { Driver } from "../../lib/pw-driver";

export default class BaseMobilePage {
  protected driver: Driver;

  constructor() {
    this.driver = pwMobileDriver.getDriver();
  }

  async tapElement(accessibilityId: string): Promise<void> {
    const element = await this.driver.findElement(
      "accessibility id",
      accessibilityId,
    );
    if (!element.ELEMENT)
      throw new Error(
        `No element found with accessibility id: ${accessibilityId}`,
      );
    await this.driver.click(element.ELEMENT);
  }

  async inputText(accessibilityId: string, text: string): Promise<void> {
    const element = await this.driver.findElement(
      "accessibility id",
      accessibilityId,
    );
    if (!element.ELEMENT)
      throw new Error(
        `No element found with accessibility id: ${accessibilityId}`,
      );
    await this.driver.setValue(element.ELEMENT, text);
  }

  async isElementDisplayed(accessibilityId: string): Promise<boolean> {
    try {
      const element = await this.driver.findElement(
        "accessibility id",
        accessibilityId,
      );
      if (!element.ELEMENT) return false;
      return await this.driver.elementDisplayed(element.ELEMENT);
    } catch (error) {
      return false;
    }
  }

  async waitForElement(
    accessibilityId: string,
    timeout = 10000,
  ): Promise<void> {
    await this.driver.implicitWaitW3C(timeout);
    const element = await this.driver.findElement(
      "accessibility id",
      accessibilityId,
    );
    if (!element.ELEMENT)
      throw new Error(
        `No element found with accessibility id: ${accessibilityId}`,
      );
    await this.driver.elementDisplayed(element.ELEMENT);
  }
}
