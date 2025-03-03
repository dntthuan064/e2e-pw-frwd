import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { LOGIN_PAGE, SELECTORS } from "../common/enum";

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page, LOGIN_PAGE.PATH);
    this.emailInput = this.page.locator(SELECTORS.EMAIL_INPUT);
    this.passwordInput = this.page.locator(SELECTORS.PASSWORD_INPUT);
    this.loginButton = this.page.locator(SELECTORS.LOGIN_BUTTON);
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async isLoginFormVisible(): Promise<boolean> {
    const [emailVisible, passwordVisible, buttonVisible] = await Promise.all([
      this.emailInput.isVisible(),
      this.passwordInput.isVisible(),
      this.loginButton.isVisible(),
    ]);
    return emailVisible && passwordVisible && buttonVisible;
  }
}
