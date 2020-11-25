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

function prettier(argv = []) {
  let files = ["."];
  if (argv.length !== 0) {
    files = argv.filter((f) => f.match(/\.(js|json|md|yml)$/));
    if (files.length === 0) {
      return Promise.resolve({});
    }
  }

  const cmd = [
    "npx",
    "prettier",
    "--loglevel",
    "warn",
    "--check",
    ...files,
  ].join(" ");

  return exec(cmd).catch((err) => err);
}

function jshint(argv = []) {
  let files = ["."];
  if (argv.length !== 0) {
    files = argv.filter((f) => f.match(/\.js$/));
    if (files.length === 0) {
      return Promise.resolve({});
    }
  }

  const cmd = [
    "npx",
    "jshint",
    "--reporter",
    "./src/jshint-reporter.js",
    ...files,
  ].join(" ");

  return exec(cmd).catch((err) => err);
}
