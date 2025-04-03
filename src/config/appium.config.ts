import { join } from "path";

export const ANDROID_CAPABILITIES = {
  platformName: "Android",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": process.env.ANDROID_DEVICE_NAME || "Android Emulator",
  "appium:app":
    process.env.ANDROID_APP_PATH || join(process.cwd(), "/apps/app-debug.apk"),
  "appium:avd": process.env.ANDROID_AVD_NAME,
  "appium:noReset": false,
};

export const IOS_CAPABILITIES = {
  platformName: "iOS",
  "appium:automationName": "XCUITest",
  "appium:deviceName": process.env.IOS_DEVICE_NAME || "iPhone Simulator",
  "appium:app":
    process.env.IOS_APP_PATH || join(process.cwd(), "/apps/app.app"),
  "appium:platformVersion": process.env.IOS_PLATFORM_VERSION || "15.0",
  "appium:noReset": false,
};

export const APPIUM_SERVER = {
  protocol: "http",
  hostname: "localhost",
  port: 4723,
  path: "/",
  logLevel: "info" as "trace" | "debug" | "info" | "warn" | "error" | "silent",
};
