import { Given, When, Then } from "@cucumber/cucumber";
import mobileDriver from "../utils/mobile-driver";
import { expect } from "@playwright/test";

Given("I launch the mobile app", async function () {
  // The app is launched automatically when session is created
  const driver = mobileDriver.getDriver();
  await driver.pause(2000); // Wait for app to fully load
});

When("I tap on element with id {string}", async function (id) {
  const driver = mobileDriver.getDriver();
  const element = await driver.$(`~${id}`);
  await element.click();
});

When("I enter {string} into field with id {string}", async function (text, id) {
  const driver = mobileDriver.getDriver();
  const element = await driver.$(`~${id}`);
  await element.setValue(text);
});

Then("I should see element with text {string}", async function (text) {
  const driver = mobileDriver.getDriver();
  const element = await driver.$(`//*[@text="${text}"]`);
  expect(await element.isDisplayed()).toBeTruthy();
});

// iOS specific step
Then(
  "I should see iOS element with accessibility id {string}",
  async function (id) {
    const driver = mobileDriver.getDriver();
    const element = await driver.$(`~${id}`);
    expect(await element.isDisplayed());
  }
);
