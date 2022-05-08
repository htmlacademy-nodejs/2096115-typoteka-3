'use strict'

const chalk = require(`chalk`);
const {HELP_TEXT, ExitCode} = require(`./utils/constants`);

module.exports = {
  name: `--help`,
  run() {
    console.info(chalk.gray(HELP_TEXT));
    process.exit(ExitCode.success);
  }
}
