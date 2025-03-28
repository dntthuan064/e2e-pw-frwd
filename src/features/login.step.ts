import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../common/world';
import LoginPage from '../pages/web/login.page';
import LoginMobilePage from '../pages/mobile/login.mobile.page';

Given('I am on the login page', async function(this: CustomWorld) {
  if (this.platform === 'web' && this.page) {
    const loginPage = new LoginPage(this.page);
    await loginPage.goto();
  } else {
    // Mobile app typically launches directly to login or home
    // The app is launched automatically when session is created
    await this.mobileDriver?.pause(2000); // Wait for app to fully load
  }
});

When('I enter {string} as email', async function(this: CustomWorld, email: string) {
  if (this.platform === 'web' && this.page) {
    const loginPage = new LoginPage(this.page);
    await loginPage.enterEmail(email);
  } else if (this.mobileDriver) {
    const loginPage = new LoginMobilePage();
    await loginPage.enterEmail(email);
  }
});

When('I enter {string} as password', async function(this: CustomWorld, password: string) {
  if (this.platform === 'web' && this.page) {
    const loginPage = new LoginPage(this.page);
    await loginPage.enterPassword(password);
  } else if (this.mobileDriver) {
    const loginPage = new LoginMobilePage();
    await loginPage.enterPassword(password);
  }
});

When('I click the login button', async function(this: CustomWorld) {
  if (this.platform === 'web' && this.page) {
    const loginPage = new LoginPage(this.page);
    await loginPage.clickLoginButton();
  } else if (this.mobileDriver) {
    const loginPage = new LoginMobilePage();
    await loginPage.tapLoginButton();
  }
});

Then('I should be redirected to the dashboard', async function(this: CustomWorld) {
  if (this.platform === 'web' && this.page) {
    // Web verification
    await expect(this.page).toHaveURL(/dashboard/);
  } else if (this.mobileDriver) {
    // Mobile verification
    const loginPage = new LoginMobilePage();
    expect(await loginPage.isWelcomeMessageDisplayed()).toBeTruthy();
  }
}); 