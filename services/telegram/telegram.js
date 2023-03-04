require("dotenv").config();
const Telegraf = require("telegraf").Telegraf;
const message = require("telegraf/filters").message;
//const echo = require("./services/telegram/actions/echo");

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

function start() {
  bot.launch();
  console.log("Telegram is working");
}

//bot.on(message("text"), async (ctx) => echo.echo(ctx));

module.exports.start = start;
