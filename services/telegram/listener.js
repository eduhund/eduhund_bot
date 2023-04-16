const { log } = require("../../services/log/log");

const { bot } = require("./telegram");
const { processContext } = require("@processes/processContext/processContext");
const { incomingData } = require("./dataProcessor");
const { getTelegramContext } = require("../../utils/getContext");

function telegramListenerRun() {
	bot.command("start", async (ctx) => {
		log.debug("Telegram — New bot command: ", ctx);
		const data = await incomingData(ctx.message);
		const context = "tStart";
		const response = await processContext(context, data);
		ctx.session = response?.newBotContext;
	});

	bot.command("help", async (ctx) => {
		log.debug("Telegram — New bot command: ", ctx);
		const data = await incomingData(ctx.message);
		const context = "tHelp";
		processContext(context, data);
	});

	bot.command("settings", async (ctx) => {
		log.debug("Telegram — New bot command: ", ctx);
		const data = await incomingData(ctx.message);
		const context = "tSettings";
		processContext(context, data);
	});

	bot.on("callback_query", async (ctx) => {
		log.debug("Telegram — New callback query: ", ctx);
		const data = await incomingData(ctx.callbackQuery);
		const context = ctx.callbackQuery.data;
		const response = await processContext(context, data);
		ctx.session = response?.newBotContext;
	});

	bot.on("message", async (ctx) => {
		log.debug("Telegram — New message: ", ctx);
		const data = await incomingData(ctx.message);
		const botContext = ctx.session;
		const context = getTelegramContext(data.message?.text, botContext);
		const response = await processContext(context, data);
		ctx.session = response?.newBotContext;
	});
}

module.exports = { telegramListenerRun };
