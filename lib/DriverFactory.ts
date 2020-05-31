/* eslint-disable no-unused-vars */
"use strict";

// import selenium, { logging } from 'selenium-webdriver';
import * as selenium from "selenium-webdriver";
import * as firefox from "selenium-webdriver/firefox";
import config from "./config";
let capabilities;
let cap;
let options;
let loggingPrefs;

function DriverFactory(this: any) {
  this.build();
}

DriverFactory.prototype.build = async function () {
  switch (config.browser) {
    case "chrome":
      loggingPrefs = new selenium.logging.Preferences();
      // TODO Further refine the logging
      loggingPrefs.setLevel(
        selenium.logging.Type.BROWSER,
        selenium.logging.Level.SEVERE
      );
      capabilities = selenium.Capabilities.chrome();
      capabilities.setLoggingPrefs(loggingPrefs);
      capabilities.set("goog:chromeOptions", {
        args: [
          //    '--headless',
          "--verbose",
          "--no-sandbox",
          "window-size=1024,768",
          "--disable-gpu",
          "--disable-dev-shm-usage",
        ],
      });
      this.driver = new selenium.Builder()
        .forBrowser(config.browser)
        .withCapabilities(capabilities)
        .build();

      cap = await this.driver.getCapabilities();
      break;
    case "firefox":
      // TODO enable logging for firefox
      options = new firefox.Options();
      options.addArguments("-headless");
      this.driver = new selenium.Builder()
        .forBrowser(config.browser)
        .setFirefoxOptions(options)
        .build();

      cap = await this.driver.getCapabilities();
      break;
    default:
      console.log(config.browser + " is unrecognized");
  }
};

DriverFactory.prototype.quit = function () {
  this.driver.quit();
};

export default DriverFactory;
