'use strict';

const fs = require(`fs`);

const {Constant} = require(`../../../constant`);
const {InitialData} = require(`../../../InitialData`);
const {CommonUtils} = require(`../../../utils/CommonUtils`);
const {GeneratorUtils} = require(`../../../utils/GeneratorUtils`);

const generatedObjectsCount = Object.freeze({
  DEFAULT: 1,
  MAX: 1000,
});

const DESCRIPTION_MIN_SENTENCES_AMOUNT = 1;
const DESCRIPTION_MAX_SENTENCES_AMOUNT = 5;
const PICTURE_NAME_INT_LENGTH = 2;
const CATEGORY_MIN_ITEMS_AMOUNT = 1;
const FILE_NAME = `mocks.json`;

const generateOffers = (count) => (
  Array(count).fill({}).map(() => {
    const TYPE_INDEX = CommonUtils.getRandomInt(0, Object.keys(InitialData.OfferType).length - 1);
    const DESCRIPTION_AMOUNT_INDEX = CommonUtils.getRandomInt(DESCRIPTION_MIN_SENTENCES_AMOUNT, DESCRIPTION_MAX_SENTENCES_AMOUNT - 1);
    const PICTURE_NAME_NUMBER = CommonUtils.getRandomInt(InitialData.PictureRestrict.MIN, InitialData.PictureRestrict.MAX);
    const CATEGORY_AMOUNT_INDEX = CommonUtils.getRandomInt(CATEGORY_MIN_ITEMS_AMOUNT, InitialData.CATEGORIES.length - 1);

    return (
      {
        type: InitialData.OfferType[Object.keys(InitialData.OfferType)[TYPE_INDEX]],
        title: InitialData.TITLES[CommonUtils.getRandomInt(0, InitialData.TITLES.length - 1)],
        description: CommonUtils.shuffleArray(InitialData.SENTENCES).slice(0, DESCRIPTION_AMOUNT_INDEX).join(` `),
        sum: CommonUtils.getRandomInt(InitialData.SumRestrict.MIN, InitialData.SumRestrict.MAX),
        picture: `item${GeneratorUtils.generatePictureName(PICTURE_NAME_NUMBER, PICTURE_NAME_INT_LENGTH)}.jpg`,
        category: CommonUtils.shuffleArray(InitialData.CATEGORIES).slice(0, CATEGORY_AMOUNT_INDEX),
      }
    );
  })
);

module.exports = {
  name: `--generate`,
  run(args = generatedObjectsCount.DEFAULT) {
    let countOffer = Number.parseInt(args, 10);

    if (countOffer > generatedObjectsCount.MAX) {
      console.error(`Не больше ${generatedObjectsCount.MAX} объявлений`);
      process.exit(Constant.ExitCode.ERROR);
    }

    const content = JSON.stringify(generateOffers(countOffer));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        console.error(`Can't write data to file...`);
        process.exit(Constant.ExitCode.ERROR);
      }

      console.info(`Operation success. File created.`);
      process.exit(Constant.ExitCode.SUCCESS);
    });
  }
};
