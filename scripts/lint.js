#!/usr/bin/env node

const util = require("util");
const exec = util.promisify(require("child_process").exec);

console.log("==> Linting files...");

Promise.all([prettier(process.argv.slice(2)), jshint(process.argv.slice(2))])
  .then(([prettier, jshint]) => {
    sendToStderr(prettier.stderr);
    sendToStderr(jshint.stderr);

    if (prettier.code > 0 || jshint.code > 0) {
      console.log("==> Linting failed");
      return 1;
    }

    console.log("==> Code looks good...let's hope it works");
    return 0;
  })
  .then((exitCode) => process.exit(exitCode))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

function sendToStderr(stderr) {
  if (!stderr) {
    return;
  }

  process.stderr.write(stderr);
}

function prettier(files = []) {
  const filteredFiles = filterFiles(/\.(js|json|md|yml)$/, files, ["."]);
  const cmd = [
    "npx",
    "prettier",
    "--loglevel",
    "warn",
    "--check",
    ...filteredFiles,
  ].join(" ");

  return exec(cmd).catch((err) => err);
}

function jshint(files = []) {
  const filteredFiles = filterFiles(/\.js$/, files, ["."]);
  const cmd = [
    "npx",
    "jshint",
    "--reporter",
    "./src/jshint-reporter.js",
    ...filteredFiles,
  ].join(" ");

  return exec(cmd).catch((err) => err);
}

function filterFiles(regex, files, defaultFiles) {
  if (files.length === 0) {
    return defaultFiles;
  }

  return files.filter((f) => f.match(regex));
}
