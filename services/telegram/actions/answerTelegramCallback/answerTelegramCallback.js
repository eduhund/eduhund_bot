const { bot } = require("@tg/telegram");

async function answerTelegramCallback({ callbackId }) {
	await bot.telegram.answerCbQuery(callbackId);
}

module.exports = answerTelegramCallback;
