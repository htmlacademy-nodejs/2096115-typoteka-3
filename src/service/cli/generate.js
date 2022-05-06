'use strict'

const fs = require(`fs`);
const {getRandomInt, shuffle, subtractMonths, getFormattedDateString} = require(`./utils/utils`);
const {
  CATEGORIES, TITLES, SENTENCES, DEFAULT_COUNT, FILE_NAME, ExitCode,
} = require(`./utils/constants`);

const generateOffers = (count) => (
  Array.from({length: count}, () => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createdDate: getFormattedDateString(subtractMonths(new Date(), getRandomInt(0, 3))),
    announce: shuffle(SENTENCES).slice(getRandomInt(0, 4), 5).join(` `),
    fullText: shuffle(SENTENCES).slice(getRandomInt(0, 5), 10).join(` `),
    category: shuffle(CATEGORIES).slice(0, getRandomInt(1, 3)),
  }))
);

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > 1000) {
      throw new Error(`Не больше 1000 публикаций`);
    }

    const content = JSON.stringify(generateOffers(countOffer));
    fs.writeFile(FILE_NAME, content, err => {
      if (err) throw new Error(`Can't write file`)
      console.info(`File has been created!`)
      process.exit(ExitCode.success);
    });
  }
}
