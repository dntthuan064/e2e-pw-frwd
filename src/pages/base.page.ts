import { Page, Locator } from '@playwright/test';
import { TIMEOUT } from '../common/enum';

export class BasePage {
  readonly page: Page;
  readonly path: string;

  constructor(page: Page, path: string) {
    this.page = page;
    this.path = path;
  }

  async goto(path?: string) {
    await this.page.goto(path || this.path);
  }

  async waitForURL(url: string | RegExp) {
    await this.page.waitForURL(url);
  }

  async clickByLocator(selector: string, index = 0) {
    const element = this.page.locator(selector).nth(index);
    await element.waitFor({ state: 'visible', timeout: TIMEOUT.MEDIUM });
    await element.click();
  }

  async fillByLocator(selector: string, value: string, index = 0) {
    const element = this.page.locator(selector).nth(index);
    await element.waitFor({ state: 'visible', timeout: TIMEOUT.MEDIUM });
    await element.fill(value);
  }

  async getTextByLocator(selector: string, index = 0): Promise<string> {
    const element = this.page.locator(selector).nth(index);
    await element.waitFor({ state: 'visible', timeout: TIMEOUT.MEDIUM });
    const text = await element.textContent();
    return text ?? '';
  }

  async isElementVisible(selector: string, index = 0): Promise<boolean> {
    const element = this.page.locator(selector).nth(index);
    return element.isVisible();
  }
} 