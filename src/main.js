const app = require("./app");
const browser = require("./browser");

const PORT = process.env.PORT || 80;
browser.launch().then((browser) => {
  app.set("browser", browser);
  app.listen(PORT, () => {
    console.log(`sauce listening on port ${PORT}`);
  });
});
