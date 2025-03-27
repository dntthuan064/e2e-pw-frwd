import { Page } from '@playwright/test';

export default class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(process.env.BASE_URL + '/login');
  }

  async enterEmail(email: string) {
    await this.page.fill('input[name="email"]', email);
  }

  async enterPassword(password: string) {
    await this.page.fill('input[name="password"]', password);
  }

  async clickLoginButton() {
    await this.page.click('button[type="submit"]');
  }

  async loginWithCredentials(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
} 