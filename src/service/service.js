'use strict';

const {Cli} = require(`./cli/index.js`);
const {Constant} = require(`../constant`);

const userArguments = process.argv.slice(Constant.USER_ARGV_INDEX);
const [userCommand] = userArguments;
const USER_GENERATE_COUNTER_INDEX = 1;

if (userArguments.length === 0 || !Cli[userCommand]) {
  Cli[Constant.DEFAULT_COMMAND].run();
} else {
  Cli[userCommand].run(userArguments[USER_GENERATE_COUNTER_INDEX]);
}
