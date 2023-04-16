const { log } = require("../../../../services/log/log");

const { getPhrase } = require("@assets/dict/dict");
const { getKeyboard } = require("@utils/telegramReplyFabric");
const { bot } = require("@tg/telegram");

async function sendMessageToTelegram({ to, intent, lang, data, params = {} }) {
	const text = getPhrase(lang, intent, data);
	const replies = getKeyboard(lang, intent, data);
	const options = {
		disable_web_page_preview: params.noLink,
	};
	if (replies) {
		options.reply_markup = replies;
	}
	if (intent.startsWith("start")) {
		options.reply_markup = {
			keyboard: [
				[{ text: getPhrase(lang, "catKB") }],
				[{ text: getPhrase(lang, "otherModulesKB") }],
				//[{ text: getPhrase(lang, "diplomaKB") }],
			],
			is_persistent: true,
			resize_keyboard: true,
		};
	}
	await bot.telegram.sendMessage(to.userId, text, options);
	log.debug("Telegram — Message has been sended: ", {
		to: to.userId,
		text,
		options,
	});
}

module.exports = { sendMessageToTelegram };
