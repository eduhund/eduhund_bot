const { bot } = require("./telegram");
const { processContext } = require("@processes/processContext/processContext");
const { incomingData } = require("./dataProcessor");
const { getTelegramContext } = require("../../utils/getContext");

function telegramListenerRun() {
	bot.command("start", async (ctx) => {
		const data = await incomingData(ctx.message);
		const context = "tStart";
		const response = await processContext(context, data);
		ctx.session = response?.newBotContext;
	});

	bot.command("help", async (ctx) => {
		const data = await incomingData(ctx.message);
		const context = "tHelp";
		processContext(context, data);
	});

	bot.command("settings", async (ctx) => {
		const data = await incomingData(ctx.message);
		const context = "tSettings";
		processContext(context, data);
	});

	bot.on("callback_query", async (ctx) => {
		const data = await incomingData(ctx.callbackQuery);
		const context = ctx.callbackQuery.data;
		const response = await processContext(context, data);
		ctx.session = response?.newBotContext;
	});

	bot.on("message", async (ctx) => {
		const data = await incomingData(ctx.message);
		const botContext = ctx.session;
		const context = getTelegramContext(data.message?.text, botContext);
		const response = await processContext(context, data);
		ctx.session = response?.newBotContext;
	});
}

module.exports = { telegramListenerRun };
