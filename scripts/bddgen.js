const fs = require("fs");
const path = require("path");
const glob = require("glob");

const FEATURES_DIR = path.join(__dirname, "../src/features");
const OUTPUT_DIR = path.join(__dirname, "../.features-gen");

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Find all feature files
const featureFiles = glob.sync("**/*.feature", { cwd: FEATURES_DIR });

featureFiles.forEach((featureFile) => {
  const featureContent = fs.readFileSync(
    path.join(FEATURES_DIR, featureFile),
    "utf8",
  );
  const outputFile = path.join(
    OUTPUT_DIR,
    featureFile.replace(".feature", ".spec.ts"),
  );
  const outputDir = path.dirname(outputFile);

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate test file content
  const testContent = `
    import { test } from '../src/common/fixtures';
    import '../src/features/${path.dirname(featureFile)}/${path.basename(featureFile, ".feature")}.steps';

    test.describe('${path.basename(featureFile, ".feature")}', () => {
      test('Run Cucumber feature', async ({ page }) => {
        // Feature file will be processed by Cucumber
        await page.goto('/');
      });
    });
  `;

  fs.writeFileSync(outputFile, testContent);
  console.log(`Generated test file: ${outputFile}`);
});
