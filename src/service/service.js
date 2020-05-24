'use strict';

const {Cli} = require(`./cli/index.js`);
const {Constant} = require(`../constant`);

const userArguments = process.argv.slice(Constant.USER_ARGV_INDEX);
const [userCommand] = userArguments;

if (userArguments.length === 0 || !Cli[userCommand]) {
  Cli[Constant.DEFAULT_COMMAND].run();
} else {
  Cli[userCommand].run(userArguments.slice(1)[0]);
}
