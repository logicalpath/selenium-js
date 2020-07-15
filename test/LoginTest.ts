"use strict";
import { assert } from "chai";
import LoginPage from "../pages/LoginPage";
import { getDriver, quitDriver } from "./BaseTest";
import { addContext } from "mochawesome/addContext";
import * as dotenv from "dotenv";
import { addConsoleHandler } from "selenium-webdriver/lib/logging";

const USER_NAME = "tomsmith";
const USER_PWD = "SuperSecretPassword!";

describe("Login", function () {
  this.timeout(0);
  let login: LoginPage;

  before(async function () {
    login = new LoginPage(getDriver());
  });

  after(async function () {
    quitDriver();
  });

  it("logs in with valid credentials", async function () {
    this.retries(3);
    //  addContext(this, "This is addContext from login");
    //  fails:  TypeError: addContext_1.addContext is not a function
    const myenv = dotenv.config();
    console.log(myenv);
    const myvar = process.env.myvar;
    console.log(myvar);

    const formDisplayed = await login.formLoaded(
      "From LoginTest: Check that the login form is loaded"
    );
    assert.equal(formDisplayed, true, "Login form not displayed");
    await login.with(USER_NAME, USER_PWD);
    const elementDisplayed = await login.successMessagePresent(
      "From LoginTest: Check that the dashboard is displayed after login."
    );
    assert.equal(elementDisplayed, true, "Success message should be displayed");
  });
});
