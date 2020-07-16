# Selenium Node

These scripts run against a local running install of Dave Haeffner's [the-internet](https://github.com/saucelabs/the-internet). I highly reccomend his [Guidebook](https://seleniumguidebook.com/) especially if you are just learning Selenium.

## Intalling the project

- clone the project `git clone git@github.com:logicalpath/selenium-js.git`
- cd to root directory of project (selenium-js)
- run `npm install`

Login credentials are set as env variables using [dotenv](https://www.npmjs.com/package/dotenv). The `.env` file is not tracked in the project. Your choice is to create a local `.env` file in the root of the project, or set the variables on the command line when executing the script. You can find the login credentials in `login_spec.rb` from the-internet project cited above.

Here are the env variables that must contain the creds:

```
TIUser
TIPass

```

## Executing the scripts

Including the env variables on the command line:

```
TIUser="lookitup!" TIPass="lookitup!" npm run test
```

If you've added the env variables to a `.env` file:

```
npm run test
```
