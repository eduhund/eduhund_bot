const { bot } = require("./telegram");
const message = require("telegraf/filters").message;
const { echo } = require("../slack/actions");

function telegramListenerRun() {
  bot.on(message("text"), async (ctx) => echo(ctx.message.text));
}

module.exports.telegramListenerRun = telegramListenerRun;
