'use strict'

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {getRandomInt, shuffle, subtractMonths, getFormattedDateString} = require(`./utils/utils`);
const {
  CATEGORIES, TITLES, SENTENCES, DEFAULT_COUNT, FILE_NAME, ExitCode,
} = require(`./utils/constants`);

const generatePosts = (count) => (
  Array.from({length: count}, () => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createdDate: getFormattedDateString(subtractMonths(new Date(), getRandomInt(0, 3))),
    announce: shuffle(SENTENCES).slice(getRandomInt(0, 4), 5).join(` `),
    fullText: shuffle(SENTENCES).slice(getRandomInt(0, 5), 10).join(` `),
    category: shuffle(CATEGORIES).slice(0, getRandomInt(1, 3)),
  }))
);

const readContent = async (path) => {
  try {
    const content = await fs.readFile(path, `utf-8`);
    return content.trim().split(`\n`);
  } catch (error) {
    throw new Error(chalk.red(error.message));
  }
}

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > 1000) {
      throw new Error(`Не больше 1000 публикаций`);
    }

    const content = JSON.stringify(generatePosts(countOffer));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`File has been created!`));
      process.exit(ExitCode.success);
    } catch (error) {
      throw new Error(`Can't write file`);
    }
  }
}
