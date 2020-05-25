'use strict';

const DEFAULT_COMMAND = `--generate`;
const USER_ARGV_INDEX = 2;
const ExitCode = Object.freeze({
  SUCCESS: 0,
  ERROR: 1,
});

const Constant = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode,
};

module.exports = Constant;
