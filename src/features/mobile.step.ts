import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../common/world";
import { expect } from "@playwright/test";
import type { Driver } from "../lib/pw-driver";

Given("I launch the mobile app", async function (this: CustomWorld) {
  // The app is launched automatically when session is created
  await this.mobileDriver?.implicitWaitW3C(2000); // Wait for app to fully load
});

When(
  "I tap on element with id {string}",
  async function (this: CustomWorld, id: string) {
    if (!this.mobileDriver) throw new Error("Mobile driver not initialized");
    const element = await this.mobileDriver.findElement("accessibility id", id);
    if (!element.ELEMENT)
      throw new Error(`No element found with accessibility id: ${id}`);
    await this.mobileDriver.click(element.ELEMENT);
  },
);

When(
  "I enter {string} into field with id {string}",
  async function (this: CustomWorld, text: string, id: string) {
    if (!this.mobileDriver) throw new Error("Mobile driver not initialized");
    const element = await this.mobileDriver.findElement("accessibility id", id);
    if (!element.ELEMENT)
      throw new Error(`No element found with accessibility id: ${id}`);
    await this.mobileDriver.setValue(element.ELEMENT, text);
  },
);

Then(
  "I should see element with text {string}",
  async function (this: CustomWorld, text: string) {
    if (!this.mobileDriver) throw new Error("Mobile driver not initialized");
    const element = await this.mobileDriver.findElement(
      "xpath",
      `//*[@text="${text}"]`,
    );
    if (!element.ELEMENT)
      throw new Error(`No element found with text: ${text}`);
    const isDisplayed = await this.mobileDriver.elementDisplayed(
      element.ELEMENT,
    );
    expect(isDisplayed).toBeTruthy();
  },
);

// iOS specific step
Then(
  "I should see iOS element with accessibility id {string}",
  async function (this: CustomWorld, id: string) {
    if (!this.mobileDriver) throw new Error("Mobile driver not initialized");
    const element = await this.mobileDriver.findElement("accessibility id", id);
    if (!element.ELEMENT)
      throw new Error(`No element found with accessibility id: ${id}`);
    const isDisplayed = await this.mobileDriver.elementDisplayed(
      element.ELEMENT,
    );
    expect(isDisplayed).toBeTruthy();
  },
);
