# To install project run commands:
```console
npm install
npm run webdriver-update
```
Then create the config.js file in the root directory with the following structure:
```javascript
  module.exports = {
    email: { // email credentials
        username: '',
        password: ''
      },
      screenshotDir: '' // absolute path to screenshots directory
    }
```


# To start the project
navigate to project folder and run
```console
npm start
```
or if you are using global protractor version:
```console
protractor protractor.conf.js
```
