const { log } = require("../../services/log/log");

const { Telegraf, session } = require("telegraf");

// Initialize
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

// Start function
function start() {
	bot.use(session());
	bot.launch();
	log.info("Telegram started successful");
}

module.exports = { start, bot };
