'use strict';

const getRandomInt = (min, max) => {
  const currentMin = Math.ceil(min);
  const currentMax = Math.floor(max);
  const permissibleRange = Math.random() * (currentMax - currentMin + 1);
  return Math.floor(permissibleRange) + currentMin;
};

const shuffleArray = (array) => {
  const shuffledArray = array.slice();

  shuffledArray.forEach((item, index) => {
    const randomPosition = Math.floor(Math.random() * index);
    [shuffledArray[index], shuffledArray[randomPosition]] = [shuffledArray[randomPosition], shuffledArray[index]];
  });

  return shuffledArray;
};

module.exports = {
  getRandomInt,
  shuffleArray,
};
