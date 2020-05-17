const axios = require('axios').default; // модуль для http запросов
const { browser, element, protractor, ExpectedConditions } = require('protractor');

class MainHelper {
  constructor() {
    this.toEmail = '';
    this.requestLinks = [
      'https://aws.random.cat/meow',
      'https://random.dog/woof.json',
      'https://randomfox.ca/floof/'
    ];
    this.responsesData = [];
    this.imagesLinks = [];
    this.emailHost = 'http://getnada.com/';
    /* LOCATORS */
    this.emailAddressLocator = by.className('address what_to_copy');
    this.emailItemLocator = by.css('.msg_list .msg_item');
    this.emailIframeLocator = by.id('idIframe');
    this.emailTextLocator = by.css('body');
  }

  async getEmail() {
    await browser.get(this.emailHost);
    await browser.wait(
      ExpectedConditions.elementToBeClickable(await element(this.emailAddressLocator)),
       15000,
       'email is absent'
   );
    this.toEmail = await element(this.emailAddressLocator).getText();
  }

  async getLinks() {
    for(let i = 0; i < this.requestLinks.length; i++) {
      let response = await axios.get(this.requestLinks[i]);
      this.responsesData.push(response.data);
    }
  }

  async getImages() {
    const fileExtension = ['jpg', 'jpeg', 'png', 'svg', 'bmp', 'gif'];
    for(let i = 0; i < this.responsesData.length; i++) {
      for(let key in this.responsesData[i]) {
        if(typeof this.responsesData[i][key] != 'string') {
          continue;
        }
        let splited = this.responsesData[i][key].split('.');
        if(fileExtension.indexOf(splited[splited.length - 1]) > -1) {
          this.imagesLinks.push(this.responsesData[i][key]);
        }
      }
    }
  }

  async waitUntilEmailDelivered() {
    let prevCount = await element.all(this.emailItemLocator).count();

    await browser.wait(() => {
      return element.all(this.emailItemLocator).count().then(currentCount => {
        let result = currentCount > prevCount;
        prevCount = currentCount;
        return result;
      });
    }, 30000, 'email was not delivered');
  }

  async getEmailText() {
    const item = await element.all(this.emailItemLocator).first().click();
    await browser.wait(
      ExpectedConditions.elementToBeClickable(await element(this.emailIframeLocator),
      15000,
      'email is absent'
      )
    );
    browser.switchTo().frame(element(this.emailIframeLocator).getWebElement());
    const text = await element(this.emailTextLocator).getText();
    await browser.switchTo().defaultContent();
    return text;
  }
}

module.exports = MainHelper;
