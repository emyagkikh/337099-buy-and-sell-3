'use strict';

const Cli = require(`./cli/index.js`);
const {DEFAULT_COMMAND, USER_ARGV_INDEX, ExitCode} = require(`../constant`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;
const USER_GENERATE_COUNTER_INDEX = 1;

if (!userArguments.length || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.SUCCESS);
}

Cli[userCommand].run(userArguments[USER_GENERATE_COUNTER_INDEX]);
