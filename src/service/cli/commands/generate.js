'use strict';

const fs = require(`fs`);

const {Constant} = require(`../../../constant`);
const {GenerateData} = require(`../data/generate-data`);
const {CommonUtils} = require(`../../../utils/common-utils`);
const {GenerateUtils} = require(`../../../utils/generate-utils`);

const GeneratedObjectsCount = Object.freeze({
  DEFAULT: 1,
  MAX: 1000,
});

const GeneratedPictureNameRestrict = Object.freeze({
  MIN: 1,
  MAX: 16,
});

const GeneratedSumRestrict = Object.freeze({
  MIN: 1000,
  MAX: 100000,
});

const ARGV_PARSE_NUMBER_SYSTEM = 10;

const DESCRIPTION_MIN_SENTENCES_AMOUNT = 1;
const DESCRIPTION_MAX_SENTENCES_AMOUNT = 5;
const PICTURE_NAME_INT_LENGTH = 2;
const CATEGORY_MIN_ITEMS_AMOUNT = 1;
const FILE_NAME = `mocks.json`;

const generateOffers = (count) => (
  Array(count).fill({}).map(() => {
    const TYPE_INDEX = CommonUtils.getRandomInt(0, Object.keys(GenerateData.OfferType).length - 1);
    const DESCRIPTION_AMOUNT_INDEX = CommonUtils.getRandomInt(DESCRIPTION_MIN_SENTENCES_AMOUNT, DESCRIPTION_MAX_SENTENCES_AMOUNT - 1);
    const PICTURE_NAME_NUMBER = CommonUtils.getRandomInt(GeneratedPictureNameRestrict.MIN, GeneratedPictureNameRestrict.MAX);
    const CATEGORY_AMOUNT_INDEX = CommonUtils.getRandomInt(CATEGORY_MIN_ITEMS_AMOUNT, GenerateData.CATEGORIES.length - 1);

    return (
      {
        type: GenerateData.OfferType[Object.keys(GenerateData.OfferType)[TYPE_INDEX]],
        title: GenerateData.TITLES[CommonUtils.getRandomInt(0, GenerateData.TITLES.length - 1)],
        description: CommonUtils.shuffleArray(GenerateData.SENTENCES).slice(0, DESCRIPTION_AMOUNT_INDEX).join(` `),
        sum: CommonUtils.getRandomInt(GeneratedSumRestrict.MIN, GeneratedSumRestrict.MAX),
        picture: `item${GenerateUtils.generatePictureName(PICTURE_NAME_NUMBER, PICTURE_NAME_INT_LENGTH)}.jpg`,
        category: CommonUtils.shuffleArray(GenerateData.CATEGORIES).slice(0, CATEGORY_AMOUNT_INDEX),
      }
    );
  })
);

module.exports = {
  name: `--generate`,
  run(args = GeneratedObjectsCount.DEFAULT) {
    const countOffer = Number.parseInt(args, ARGV_PARSE_NUMBER_SYSTEM);

    if (countOffer > GeneratedObjectsCount.MAX) {
      console.error(`Не больше ${GeneratedObjectsCount.MAX} объявлений`);
      process.exit(Constant.ExitCode.SUCCESS);
    }

    const content = JSON.stringify(generateOffers(countOffer));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        console.error(`Can't write data to file...`);
        process.exit(Constant.ExitCode.SUCCESS);
      }

      console.info(`Operation success. File created.`);
    });
  }
};
