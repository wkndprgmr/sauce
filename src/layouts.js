const chile = require("./layout-chile");

module.exports.getLayout = (opts) => {
  if (opts.version === "chile") {
    return chile(opts);
  }

  return;
};
