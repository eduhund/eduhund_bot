const { log } = require("../../services/log");

const { Telegraf, session } = require("telegraf");

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

function start() {
	bot.use(session());
	bot.launch();
	log.info("Telegram started successful");
}

module.exports.start = start;
module.exports.bot = bot;
