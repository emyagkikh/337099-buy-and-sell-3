'use strict';

const fs = require(`fs`);

const {ExitCode} = require(`../../../constant`);
const {TITLES, SENTENCES, CATEGORIES, OfferType} = require(`../data/generate-data`);
const {getRandomInt, shuffleArray} = require(`../../../utils/common-utils`);
const generatePictureName = require(`../../../utils/generate-utils`);

const GeneratedObjectsCount = Object.freeze({
  MIN: 0,
  MAX: 1000,
  DEFAULT: 1,
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

const GeneratedDescriptionSentencesRestrict = Object.freeze({
  MIN: 1,
  MAX: 5,
});

const PICTURE_NAME_INT_LENGTH = 2;
const CATEGORY_MIN_ITEMS_AMOUNT = 1;
const FILE_NAME = `mocks.json`;

const generateOffers = (count) => (
  Array(count).fill({}).map(() => {
    const typeIndex = getRandomInt(0, Object.keys(OfferType).length - 1);
    const descriptionAmountIndex = getRandomInt(GeneratedDescriptionSentencesRestrict.MIN, GeneratedDescriptionSentencesRestrict.MAX - 1);
    const pictureNameNumber = getRandomInt(GeneratedPictureNameRestrict.MIN, GeneratedPictureNameRestrict.MAX);
    const categoryAmountIndex = getRandomInt(CATEGORY_MIN_ITEMS_AMOUNT, CATEGORIES.length - 1);

    return (
      {
        type: OfferType[Object.keys(OfferType)[typeIndex]],
        title: TITLES[getRandomInt(0, TITLES.length - 1)],
        description: shuffleArray(SENTENCES).slice(0, descriptionAmountIndex).join(` `),
        sum: getRandomInt(GeneratedSumRestrict.MIN, GeneratedSumRestrict.MAX),
        picture: `item${generatePictureName(pictureNameNumber, PICTURE_NAME_INT_LENGTH)}.jpg`,
        category: shuffleArray(CATEGORIES).slice(0, categoryAmountIndex),
      }
    );
  })
);

module.exports = {
  name: `--generate`,
  run(args = GeneratedObjectsCount.DEFAULT) {
    const countOffer = Number.parseInt(args, ARGV_PARSE_NUMBER_SYSTEM) || GeneratedObjectsCount.DEFAULT;

    if (countOffer < GeneratedObjectsCount.MIN) {
      console.error(`Нельзя вводить отрицательное число`);
      process.exit(ExitCode.ERROR);
    }

    if (countOffer > GeneratedObjectsCount.MAX) {
      console.error(`Не больше ${GeneratedObjectsCount.MAX} объявлений`);
      process.exit(ExitCode.ERROR);
    }

    const content = JSON.stringify(generateOffers(countOffer));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        console.error(`Can't write data to file...`);
        process.exit(ExitCode.ERROR);
      }

      console.info(`Operation success. File created.`);
    });
  }
};
