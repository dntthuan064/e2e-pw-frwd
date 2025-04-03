import BaseMobilePage from "./base.mobile.page";

export default class LoginMobilePage extends BaseMobilePage {
  private emailFieldId = "email_field";
  private passwordFieldId = "password_field";
  private loginButtonId = "login_button";
  private welcomeMessageId = "welcome_message";

  async enterEmail(email: string): Promise<void> {
    await this.tapElement(this.emailFieldId);
    await this.inputText(this.emailFieldId, email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.tapElement(this.passwordFieldId);
    await this.inputText(this.passwordFieldId, password);
  }

  async tapLoginButton(): Promise<void> {
    await this.tapElement(this.loginButtonId);
  }

  async isWelcomeMessageDisplayed(): Promise<boolean> {
    try {
      await this.waitForElement(this.welcomeMessageId);
      return true;
    } catch (error) {
      return false;
    }
  }

  async loginWithCredentials(email: string, password: string): Promise<void> {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.tapLoginButton();
  }
}
