export interface PageElement {
  selector: string;
  text?: string;
  index?: number;
}

export interface TestConfig {
  baseUrl: string;
  portalUrl: string;
  emailDomain: string;
  lenderSubdomain: string;
}

export interface TestContext {
  config: TestConfig;
  currentPage: string;
}
