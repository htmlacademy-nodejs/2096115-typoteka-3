'use strict'

const chalk = require(`chalk`);
const packageJsonInfo = require(`../../../package.json`);
const {ExitCode} = require("./utils/constants");

module.exports = {
  name: `--version`,
  run() {
    console.info(chalk.blue(packageJsonInfo.version));
    process.exit(ExitCode.success);
  }
}
