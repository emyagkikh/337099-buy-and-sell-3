'use strict';

const {logVersion} = require(`../../../utils/chalk-utils`);

const packageJsonFile = require(`../../../../package.json`);
const version = packageJsonFile.version;

module.exports = {
  name: `--version`,
  run() {
    console.info(logVersion(version));
  }
};
