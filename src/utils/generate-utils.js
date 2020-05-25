'use strict';

const generatePictureName = (number, length) => {
  return number.toString().padStart(length, `0`);
};

const GenerateUtils = {
  generatePictureName,
};

module.exports = {
  GenerateUtils,
};
