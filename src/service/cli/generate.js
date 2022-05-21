'use strict'

const chalk = require(`chalk`);
const path = require(`path`);
const fs = require(`fs`).promises;
const {getRandomInt, shuffle, subtractMonths, getFormattedDateString} = require(`./utils/utils`);
const {
  DEFAULT_COUNT,
  FILE_NAME,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  ExitCode,
} = require(`./utils/constants`);

const generatePosts = (count, titles, categories, sentences) => (
  Array.from({length: count}, () => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    createdDate: getFormattedDateString(subtractMonths(new Date(), getRandomInt(0, 3))),
    announce: shuffle(sentences).slice(getRandomInt(0, 4), 5).join(` `),
    fullText: shuffle(sentences).slice(getRandomInt(0, 5), 10).join(` `),
    category: shuffle(categories).slice(0, getRandomInt(1, 3)),
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
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > 1000) {
      throw new Error(`Не больше 1000 публикаций`);
    }

    const content = JSON.stringify(generatePosts(countOffer, titles, categories, sentences));

    try {
      await fs.writeFile(path.resolve(process.cwd(), FILE_NAME), content);
      console.info(chalk.green(`File has been created!`));
      process.exit(ExitCode.success);
    } catch (error) {
      throw new Error(chalk.red(`Can't write file`));
    }
  }
}
