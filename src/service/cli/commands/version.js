'use strict';

const packageJsonFile = require(`../../../../package.json`);
const {Constant} = require(`../../../constant`);

const version = packageJsonFile.version;

module.exports = {
  name: `--version`,
  run() {
    console.info(version);
    process.exit(Constant.ExitCode.SUCCESS);
  }
};
