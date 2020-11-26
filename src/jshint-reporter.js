module.exports = {
  reporter: function (res) {
    res.forEach(({ file, error }) => {
      console.error(
        `${file}: line ${error.line}, col ${error.character}, ${error.reason}`
      );
    });
  },
};
