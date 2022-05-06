'use strict'

const {HELP_TEXT, ExitCode} = require(`./utils/constants`);

module.exports = {
  name: `--help`,
  run() {
    console.info(HELP_TEXT);
    process.exit(ExitCode.success);
  }
}
