'use strict';

const {DEFAULT_PORT, HttpCode} = require("./utils/constants");
const express = require(`express`);
const postsRouter = require(`../routes/posts-routes`);
const chalk = require("chalk");

const app = express();
app.use(express.json());

app.use(`/posts`, postsRouter);

app.use((req, res) =>
  res
    .status(HttpCode.NOT_FOUND)
    .send(`NotFound`));

module.exports = {
  name: `--server`,
  run(args) {
    const [inputPort] = args;
    const port = Number.parseInt(inputPort, 10) || DEFAULT_PORT;
    app.listen(port, () => console.info(chalk.green(`Сервер запущен на порту: ${port}`)));
  }
}
