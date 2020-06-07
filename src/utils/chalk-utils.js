'use strict';

const chalk = require(`chalk`);

const logVersion = chalk.hex(`#0000ff`);
const logHelp = chalk.hex(`#ccc`);
const logError = chalk.hex(`#ff0000`);
const logSuccess = chalk.hex(`#00ff00`);

module.exports = {
  logVersion,
  logHelp,
  logError,
  logSuccess,
};
