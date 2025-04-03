module.exports = {
  default: {
    tags: "@web",
    formatOptions: {
      snippetInterface: "async-await",
    },
    paths: ["src/scenarios/"],
    require: [
      "src/common/world.ts",
      "src/features/hooks/hooks.ts",
      "src/features/*.step.ts",
    ],
    format: ["html:cucumber-report.html"],
  },
  web: {
    tags: "@web",
    formatOptions: {
      snippetInterface: "async-await",
    },
    paths: ["src/scenarios/"],
    require: [
      "src/common/world.ts",
      "src/features/hooks/hooks.ts",
      "src/features/*.step.ts",
    ],
    format: ["html:cucumber-web-report.html"],
  },
  mobile: {
    tags: "@mobile",
    formatOptions: {
      snippetInterface: "async-await",
    },
    paths: ["src/scenarios/"],
    require: [
      "src/common/world.ts",
      "src/features/hooks/hooks.ts",
      "src/features/*.step.ts",
    ],
    format: ["html:cucumber-mobile-report.html"],
  },
  android: {
    tags: "@android",
    formatOptions: {
      snippetInterface: "async-await",
    },
    paths: ["src/scenarios/"],
    require: [
      "src/common/world.ts",
      "src/features/hooks/hooks.ts",
      "src/features/*.step.ts",
    ],
    format: ["html:cucumber-android-report.html"],
  },
  ios: {
    tags: "@ios",
    formatOptions: {
      snippetInterface: "async-await",
    },
    paths: ["src/scenarios/"],
    require: [
      "src/common/world.ts",
      "src/features/hooks/hooks.ts",
      "src/features/*.step.ts",
    ],
    format: ["html:cucumber-ios-report.html"],
  },
};
