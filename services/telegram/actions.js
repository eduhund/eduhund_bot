const { bot } = require("./telegram");

async function echo(text) {
  await bot.telegram.sendMessage(3526260, text);
}

module.exports.echo = echo;
