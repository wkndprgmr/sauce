const express = require("express");
const layouts = require("./layouts");

const app = express();
app.get("/", (req, res) => {
  res.status(200).send("feeling saucy!").end();
});

app.get(
  new RegExp("([a-z]+)/([a-z-]+)/([a-z0-9-_]+)/(.*).jpg"),
  async (req, res) => {
    const { 0: version, 1: lang, 2: format, 3: src } = req.params;

    const layout = layouts.getLayout({ version, lang, format, src });

    if (!layout) {
      res.sendStatus(404);
      return;
    }

    const browser = req.app.get("browser");
    const img = await browser.screenshot({
      content: layout.getContent(),
      width: layout.getWidth(),
      height: layout.getHeight(),
      deviceScaleFactor: layout.getDeviceScaleFactor(),
    });

    res.type("jpg");
    res.send(img);
  }
);

module.exports = app;
