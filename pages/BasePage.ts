/* eslint-disable no-unused-vars */
'use strict';

import { Locator, until, WebDriver, WebElement, WebElementPromise } from 'selenium-webdriver';

import * as fs from 'fs';
import config from '../lib/config';

export default class BasePage {
    public driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    public async logConsole() {
        // TODO Perhaps write the error log to a file
        // and also include a screenshot
        const log = await this.driver.manage().logs().get('browser');
        console.log(log);
    }

    public async elementContains(elem: WebElement, searchString: string) {
        let positionInHTML: number;
        const html = await elem.getAttribute('outerHTML');
        positionInHTML = html.search(searchString);
        return positionInHTML > 0 ? true : false;
    }

    public async takeScreenshot(screenshotName: any): Promise<void> {
        let artifactsPath;

        await this.driver.takeScreenshot().then((data) => {
            artifactsPath = `artifacts/${screenshotName}.png`;
            console.log(`Saving Screenshot as: ${artifactsPath}`);
            fs.writeFileSync(artifactsPath, data, 'base64');
        });
    }

    public visit(url: string): void {
        if (url.startsWith('https')) {
            this.driver.get(url);
        } else {
            this.driver.get(config.baseUrl + url);
        }
    }

    public async find(locator: Locator): Promise<WebElement> {
        let wep: WebElement;
        wep = this.driver.findElement(locator);
        return wep;
    }

    public async findall(locator: Locator) {
        return this.driver.findElements(locator);
    }

    public async click(locator: Locator): Promise<void> {
        let elem: WebElement;
        try {
            elem = await this.find(locator);
            await elem.click();
        } catch (err) {
            console.log(err);
        }
    }

    public async elementClick(elem: WebElement): Promise<void> {
        try {
            await elem.click();
        } catch (err) {
            console.log(err);
        }
    }

    public async sendKeys(elem: WebElement, inputText: string): Promise<void> {
        await elem.sendKeys(inputText);
    }

    public async type(locator: Locator, inputText: string): Promise<void> {
        const elem = await this.find(locator);
        await elem.sendKeys(inputText);
    }

    public executeJScript(script: string | Function, param1: any, param2: any) {
        return this.driver.executeScript(script, param1, param2);
    }

    public async waitForIsDisplayed(locator: Locator, timeout: number, failureMessage: string): Promise<boolean> {
        const driver = this.driver;

        // In order to interact with an element it must exist and be visible on the page.
        // This function waits until the element exists, then waits until its visible.
        // If the element exits and is visible within the timeout period, the function
        // returns true, otherwise false.
        try {
            const element = await driver.wait(await until.elementLocated(locator), timeout);
            //  const element = await driver.findElement(locator);
            await driver.wait(await until.elementIsVisible(element), timeout);
        } catch (err) {
            console.log('Inside catch for waitForIsDisplayed');
            console.log(failureMessage);
            console.log(err);
            return false;
        }
        return true;
    }

    public async waitForExists(locator: Locator, timeout: number, failureMessage: string): Promise<boolean> {
        const driver = this.driver;
        try {
            const element = await driver.wait(await until.elementLocated(locator), timeout);
        } catch (err) {
            console.log('Inside catch for waitForExists');
            console.log(failureMessage);
            console.log(err);
            return false;
        }
        return true;
    }
}
