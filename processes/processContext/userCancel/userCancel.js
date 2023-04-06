const {
	sendMessageToTelegram,
	deleteTelegramMessage,
	answerTelegramCallback,
} = require("@tg/actions/actions");

async function userCancel({ sUserId, messageId, callbackId }) {
	if (telegramUser) {
		sendMessageToTelegram({
			userId: sUserId,
			intent: "userCancel",
			lang: "ru",
		});
		deleteTelegramMessage({
			userId: sUserId,
			messageId,
		});
		answerTelegramCallback({ callbackId });
	}

	return { OK: true, newBotContext: undefined };
}

module.exports = { userCancel };
