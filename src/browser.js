const puppeteer = require("puppeteer");
const htmlEntities = require("html-entities");

class Browser {
  constructor(browser) {
    this.browser = browser;
  }

  async screenshot({ content, width, height, deviceScaleFactor }) {
    const page = await this.browser.newPage();
    await page.setViewport({
      width,
      height,
      deviceScaleFactor,
    });

    await page.setContent(content);
    const imgBuf = await page.screenshot({
      type: "jpeg",
      quality: 100,
      fullPage: true,
    });
    await page.close();

    return imgBuf;
  }
}

async function launch() {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  return new Browser(browser);
}

module.exports = {
  launch,
};
