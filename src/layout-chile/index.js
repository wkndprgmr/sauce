const codeTemplate = require("./code-template");

class Layout {
  constructor({ lang, format, src }) {
    this.lang = lang;
    this.format = format;
    this.src = src;
  }

  getWidth() {
    return 1080;
  }

  getHeight() {
    return 1080;
  }

  getDeviceScaleFactor() {
    return 4;
  }

  getContent() {
    return codeTemplate({ lang: this.lang, src: this.src });
  }
}

module.exports = ({ lang, format, src }) => {
  return new Layout({ lang, format, src });
};
