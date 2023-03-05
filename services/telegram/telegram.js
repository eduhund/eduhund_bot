require("dotenv").config();
const Telegraf = require("telegraf").Telegraf;

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

function start() {
  bot.launch();
  console.log("Telegram is working");
}

module.exports.start = start;
module.exports.bot = bot;
