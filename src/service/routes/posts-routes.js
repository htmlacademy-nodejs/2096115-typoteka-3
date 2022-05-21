'use strict';

const {Router} = require(`express`);
const fs = require(`fs`).promises;
const path = require(`path`);
const chalk = require(`chalk`);
const {FILE_NAME} = require("../cli/utils/constants");

const postsRouter = new Router();

postsRouter.get(`/`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(path.resolve(process.cwd(), FILE_NAME));
    const mocks = JSON.parse(fileContent);
    res.status(200).json(mocks);
  } catch (err) {
    console.error(chalk.red(err.message));
    res.status(404).send([]);
  }
})

module.exports = postsRouter;
