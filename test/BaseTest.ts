/* eslint-disable no-unused-vars */
'use strict';
import * as fs from 'fs';
import * as webDriver from 'selenium-webdriver';
import DriverFactory from '../lib/DriverFactory';
import { Driver } from 'selenium-webdriver/chrome';

let driver: webDriver.WebDriver;
let driverFactory: { driver: webDriver.WebDriver; quit: () => void };
const screenShotFiles: string[] = [];
let screenshotName;
let artifactsPath;

afterEach(function () {
    const xyz = 'what';
    console.log(xyz);
    const testStatus = this.currentTest?.state;
    const testName = this.currentTest?.title;
    const prettyName = testName?.replace(/ /g, '');

    if (testStatus === 'failed') {
        driverFactory.driver.takeScreenshot().then((data) => {
            screenshotName = 'Failed-' + prettyName;
            artifactsPath = `artifacts/${screenshotName}.png`;
            fs.writeFileSync(artifactsPath, data, 'base64');
        });
    }
});

function getDriver() {
    driverFactory = new DriverFactory();
    driver = driverFactory.driver;
    return driver;
}

function quitDriver() {
    driverFactory.quit();
    console.log('From BaseTest: quitDriver: after call to quit');
}

function getScreenShotFiles() {
    return screenShotFiles;
}

export { getDriver, getScreenShotFiles, quitDriver };
