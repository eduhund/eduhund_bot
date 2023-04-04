const {
	sendMessageToTelegram,
	deleteTelegramMessage,
	answerTelegramCallback,
} = require("@tg/actions/actions");

async function userCancel({ telegramUser, messageId, callbackId }) {
	if (telegramUser) {
		sendMessageToTelegram({
			telegramUserId: telegramUser?.id,
			intent: "userCancel",
			lang: "ru",
		});
		deleteTelegramMessage({
			telegramUserId: telegramUser?.id,
			messageId,
		});
		answerTelegramCallback({ callbackId });
	}

	return { OK: true, newBotContext: undefined };
}

module.exports = userCancel;
