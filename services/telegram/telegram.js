require("dotenv").config();
const { Telegraf, session } = require("telegraf");

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

function start() {
  bot.use(session());
  bot.launch();
  console.log("Telegram is working");
}

module.exports.start = start;
module.exports.bot = bot;
