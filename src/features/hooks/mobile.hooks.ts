import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import mobileDriver from '../../utils/mobile-driver';

BeforeAll(async function () {
  // You could start Appium server programmatically here if needed
  console.log('Starting mobile testing session');
});

Before({ tags: '@android' }, async function () {
  this.driver = await mobileDriver.initDriver('android');
});

Before({ tags: '@ios' }, async function () {
  this.driver = await mobileDriver.initDriver('ios');
});

After(async function () {
  // Take screenshot on failure if needed
  if (this.result?.status === 'FAILED') {
    const screenshot = await this.driver.takeScreenshot();
    this.attach(screenshot, 'image/png');
  }
});

AfterAll(async function () {
  await mobileDriver.closeDriver();
  console.log('Ended mobile testing session');
}); 