# E2E Testing Framework with Playwright & Appium

This is a comprehensive end-to-end testing framework that integrates Playwright for web testing and Appium for mobile testing using Cucumber for behavior-driven development.

## Features

- **Cross-Platform Testing**: Test web, Android, and iOS apps with the same test scenarios
- **Behavior-Driven Development**: Write tests in Gherkin syntax for better collaboration
- **Page Object Model**: Maintain separate page objects for web and mobile interfaces
- **Jenkins Integration**: CI/CD pipeline ready with customizable test execution
- **Reporting**: HTML reports for test results with screenshots on failures

## Prerequisites

- Node.js 18+
- Yarn package manager
- For mobile testing:
  - Appium Server 2.0+
  - Android SDK (for Android testing)
  - Xcode (for iOS testing)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/{{yourUsername}}/e2e-pw-frwd.git
   cd e2e-pw-frwd
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install --with-deps
   ```

4. Set up environment variables in `.env` file:
   ```
   BASE_URL=http://yourapp.com
   APPIUM_SERVER_URL=http://localhost:4723
   ANDROID_DEVICE_NAME=Pixel_4_API_30
   ANDROID_APP_PATH=./apps/app-debug.apk
   IOS_DEVICE_NAME=iPhone 12
   IOS_APP_PATH=./apps/app.app
   ```

## Project Structure

```
.
├── src/
│   ├── common/                 # Shared utilities and configuration
│   │   ├── world.ts            # Cucumber World customization
│   │   └── types/              # TypeScript type definitions
│   ├── config/                 # Configuration files
│   │   └── appium.config.ts    # Appium configuration
│   ├── features/               # Test implementation
│   │   ├── hooks/              # Cucumber hooks
│   │   └── *.step.ts           # Step definitions
│   ├── pages/                  # Page Object Models
│   │   ├── web/                # Web page objects
│   │   └── mobile/             # Mobile page objects
│   ├── scenarios/              # Cucumber feature files
│   └── utils/                  # Utility functions
│       └── mobile-driver.ts    # Mobile driver manager
├── apps/                       # Mobile application files
├── cucumber.js                 # Cucumber configuration
├── Jenkinsfile                 # CI/CD pipeline definition
├── package.json                # Project dependencies
└── tsconfig.json               # TypeScript configuration
```

## Running Tests

### Web Tests

```bash
yarn test:web
```

### Mobile Tests

First, start the Appium server:
```bash
yarn appium:start
```

Then, in a separate terminal:

```bash
# Run all mobile tests (Android and iOS)
yarn test:mobile

# Run Android tests only
yarn test:android

# Run iOS tests only
yarn test:ios
```

### Running by Tags

You can run specific tests by tags:

```bash
yarn cucumber-js --tags "@smoke"
```

## Writing Tests

### Feature Files

Create feature files in the `src/scenarios` directory:

```gherkin
Feature: User Authentication
  
  @web
  Scenario: Login successfully on web
    Given I am on the login page
    When I enter "test@example.com" as email
    And I enter "password123" as password
    And I click the login button
    Then I should be redirected to the dashboard

  @android @mobile
  Scenario: Login successfully on Android
    Given I am on the login page
    When I enter "test@example.com" as email
    And I enter "password123" as password
    And I click the login button
    Then I should be redirected to the dashboard
```

### Step Definitions

Create platform-agnostic step definitions in `src/features`:

```typescript
Given('I am on the login page', async function(this: CustomWorld) {
  if (this.platform === 'web' && this.page) {
    const loginPage = new LoginPage(this.page);
    await loginPage.goto();
  } else {
    // Mobile app launches directly to the login screen
    await this.mobileDriver?.pause(2000);
  }
});
```

## CI/CD Integration

The project includes a Jenkinsfile for CI/CD integration. Configure your Jenkins pipeline to use the included Jenkinsfile.

The pipeline includes:
- Installation of dependencies
- Running web tests
- Optional running of mobile tests
- Generation of HTML reports

## Extending the Framework

### Adding New Features

1. Create a new feature file in `src/scenarios`
2. Implement step definitions in `src/features`
3. Create page objects in `src/pages/web` and/or `src/pages/mobile`

### Adding Custom Hooks

Add custom hooks in `src/features/hooks/hooks.ts`:

```typescript
Before({ tags: '@customTag' }, async function(this: CustomWorld) {
  // Custom setup for scenarios with @customTag
});
```

## Troubleshooting

### Mobile Driver Issues

If you encounter issues with the mobile driver:
- Ensure Appium server is running
- Check that mobile app paths are correctly configured
- Verify emulator/simulator is available and running

### WebdriverIO Types

If TypeScript complains about WebdriverIO types:
```bash
yarn add -D @types/webdriverio @wdio/types
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
