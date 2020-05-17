const { browser, element, protractor, ExpectedConditions } = require('protractor');
const config = require('../../config')
const path = require('path'); // модуль для работы с путями к файлам и папкам
const fs = require('fs'); // модуль для работы с файлами и папками

class ScreenshotHelper {

  async makeScreenshot(filename) {
    const imageData = await browser.takeScreenshot();
    this.writeScreenShot(imageData, path.join(config.screenshotDir, filename + '.png'));
  }

  writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
  }
}

module.exports = ScreenshotHelper;
