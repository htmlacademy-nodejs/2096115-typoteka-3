'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;
const {DEFAULT_PORT, FILE_NAME, HttpCode} = require("./utils/constants");

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!DOCTYPE html>
      <html lang="ru">
      <head>
        <title>NodeJS Course from HTML Academy</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

const onClientConnect = async (req, res) => {
  const notFoundMessage = `Not Found`;

  switch (req.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(FILE_NAME);
        const mocks = JSON.parse(fileContent);
        const message = mocks.map((post) => `<li>${post.title}</li>`).join(``);
        sendResponse(res, HttpCode.OK, `<ul>${message}</ul>`);
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, notFoundMessage);
      }

      break;
    default:
      sendResponse(res, HttpCode.NOT_FOUND, notFoundMessage);
      break;
  }
};

module.exports = {
  name: `--server`,
  run(args) {
    const [inputPort] = args;
    const port = Number.parseInt(inputPort, 10) || DEFAULT_PORT;

    http.createServer(onClientConnect)
      .listen(port)
      .on(`listening`, err => {
        console.info(chalk.green(`Ожидаю соединений на ${port} порт`));
      })
      .on(`error`, err => {
        throw new Error(chalk.red(`Ошибка при создании сервера: ${err.message}`));
      });
  }
}
