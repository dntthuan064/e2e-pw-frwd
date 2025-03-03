# E2E Playwright Framework

This project is an end-to-end testing framework using Playwright and Cucumber for testing web applications. It provides a structured approach to writing and executing tests, ensuring that your application behaves as expected.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Cucumber Integration**: Write tests in Gherkin syntax for better readability and collaboration.
- **Playwright**: Utilize Playwright for browser automation and testing across multiple browsers.
- **Modular Structure**: Organized folder structure for easy navigation and maintenance.
- **Custom Fixtures**: Use custom fixtures for managing test data and context.
- **Page Object Model**: Implement the Page Object Model for better test organization and reusability.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/{{yourusername}}/e2e-pw-frwd.git
   cd e2e-pw-frwd
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and define your environment variables, such as `BASE_URL`.

## Usage

To run the tests, use the following command:

```bash
yarn test
```

This command will generate the necessary test files and execute the tests using Playwright.

### Running Specific Tests

You can run specific tests by using tags in your feature files. For example, to run smoke tests:

```bash
yarn playwright test --grep @smoke
```

## Folder Structure

```
.
├── .vscode/
├── src/
│   ├── common/
│   │   ├── fixtures.ts
│   │   ├── types/
│   │   └── environment.ts
│   ├── features/
│   │   ├── auth/
│   │   └── common.step.ts
│   ├── pages/
│   │   ├── base.page.ts
│   │   └── login.page.ts
├── scripts/
├── .env
├── package.json
└── README.md
```

## Configuration

### VSCode Settings

The project includes a `.vscode/settings.json` file that configures Cucumber autocomplete and validation settings for a better development experience.

### Environment Variables

The `.env` file should include necessary environment variables, such as:

```
BASE_URL=http://yourapp.com
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
