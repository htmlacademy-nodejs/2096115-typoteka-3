'use strict'

const packageJsonInfo = require(`../../../package.json`);
const {ExitCode} = require("./utils/constants");

module.exports = {
  name: `--version`,
  run() {
    console.info(packageJsonInfo.version);
    process.exit(ExitCode.success);
  }
}
