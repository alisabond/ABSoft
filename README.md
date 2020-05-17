# To install project run commands:
  npm install
  npm run webdriver-update
Then create the config.js file in the root directory with the following structure:
  module.exports = {
    email: { // email credentials
        username: '',
        password: ''
      },
      screenshotDir: '' // absolute path to screenshots directory
    }


# To start the project
navigate to project folder and run
  npm start
or if you are using global protractor version:
  protractor protractor.conf.js
