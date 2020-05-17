const MainHelper = require('./Helpers/MainHelper');
const EmailHelper = require('./Helpers/EmailHelper');
const ScreenshotHelper = require('./Helpers/ScreenshotHelper');
const { browser, element, protractor, ExpectedConditions } = require('protractor');

browser.waitForAngularEnabled(false);

describe('test email links', function() {
  const locators = new MainHelper();
  const email = new EmailHelper();
  const screenshots = new ScreenshotHelper();

  beforeAll(async () => {
      await locators.getEmail();
      await locators.getLinks();
      await locators.getImages();
      await email.send(locators.toEmail, 'TEST', email.generateEmailText(locators.imagesLinks));
  });


  it('should test email links match the original links', async () => {
    await locators.waitUntilEmailDelivered();
    const text = await locators.getEmailText();
    expect(text).toEqual(email.generateEmailText(locators.imagesLinks));
    for(let i = 0; i < locators.imagesLinks.length; i++) {
      await browser.get(locators.imagesLinks[i]);
      screenshots.makeScreenshot(Date.now());
    }
  });
});
