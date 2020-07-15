# Selenium Node

These scripts run against a local install of Dave Haeffner's [the-internet](https://github.com/saucelabs/the-internet). I highly reccomend his [Guidebook](https://seleniumguidebook.com/) especially if you are just learning Selenium.

## Intalling the project

- clone the project `git clone git@github.com:logicalpath/selenium-js.git`
- cd to root directory of project (selenium-js)
- run `npm install`

Environment Variables that can be set at runtime:

```
baseUrl: process.env.BASE_URL || "http://localhost:9292"
browser: process.env.BROWSER || "chrome"
  or
browser: process.env.BROWSER || "firefox"
```

## Executing the scripts

```
npm run test
```
