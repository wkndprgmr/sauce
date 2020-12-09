const app = require("./app");

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`sauce listening on port ${PORT}`);
});
