const { getPhrase } = require("@assets/dict/dict");
const { getKeyboard } = require("@utils/telegramReplyFabric");
const { bot } = require("@tg/telegram");

async function sendMessageToTelegram({ telegramUserId, intent, lang, data }) {
	const text = getPhrase(lang, intent, data);
	const replies = getKeyboard(lang, intent, data);
	const options = {};
	if (replies) {
		options.reply_markup = replies;
	}
	await bot.telegram.sendMessage(telegramUserId, text, options);
}

module.exports = sendMessageToTelegram;
