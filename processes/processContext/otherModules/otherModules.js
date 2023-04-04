const { sendMessageToTelegram } = require("@tg/actions/actions");

async function otherModules({ telegramUser }) {
	if (telegramUser) {
		sendMessageToTelegram({
			telegramUserId: telegramUser?.id,
			intent: "otherModules",
			lang: "ru",
		});
	}

	return { OK: true, newBotContext: undefined };
}

module.exports = otherModules;
