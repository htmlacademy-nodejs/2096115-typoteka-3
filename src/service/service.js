'use strict';

const chalk = require(`chalk`);
const {Cli} = require(`./cli`);
const {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode
} = require(`./cli/utils/constants`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;

try {
  if (userArguments.length === 0 || !Cli[userCommand]) {
    Cli[DEFAULT_COMMAND].run();
  } else {
    Cli[userCommand].run(userArguments.slice(1));
  }
} catch (err) {
  console.error(chalk.red(err.message));
  process.exit(ExitCode.error);
}

