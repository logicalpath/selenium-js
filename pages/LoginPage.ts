"use strict";
import { WebDriver } from "selenium-webdriver";
import BasePage from "./BasePage";

const LOGIN_FORM = { id: "login" };
const USERNAME_INPUT = { id: "username" };
const PASSWORD_INPUT = { id: "password" };
const SUBMIT_BUTTON = { css: "button" };
const SUCCESS_MESSAGE = { css: ".flash.success" };
const FAILURE_MESSAGE = { css: ".flash.error" };

export default class LoginPage extends BasePage {
  constructor(driver: WebDriver) {
    super(driver);
    this.visit("/login");
  }

  public async formLoaded(stepDetail: string): Promise<boolean> {
    console.log(stepDetail);
    const isDisplayed = await this.waitForIsDisplayed(
      LOGIN_FORM,
      30000,
      "Login form not displayed."
    );

    return isDisplayed;
  }

  public async with(username: string, password: string): Promise<any> {
    this.type(USERNAME_INPUT, username);
    this.type(PASSWORD_INPUT, password);
    this.click(SUBMIT_BUTTON);
  }

  public async successMessagePresent(stepDetail: string): Promise<boolean> {
    console.log(stepDetail);

    const isDashboard = await this.waitForIsDisplayed(
      SUCCESS_MESSAGE,
      30000,
      "Success message not displayed."
    );
    return isDashboard;
  }

  public async failureMessagePresent(stepDetail: string): Promise<boolean> {
    console.log(stepDetail);
    const isFailure = await this.waitForIsDisplayed(
      FAILURE_MESSAGE,
      30000,
      "Failure message not displayed."
    );
    return isFailure;
  }
}
