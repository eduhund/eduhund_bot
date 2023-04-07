const { log } = require("../../../services/log/log");

const {
	sendMessageToTelegram,
	deleteTelegramMessage,
	answerTelegramCallback,
} = require("@tg/actions/actions");

async function userCancel({ from, message }) {
	try {
		sendMessageToTelegram({
			to: from,
			intent: "userCancel",
			lang: "ru", //from.lang
		});
		deleteTelegramMessage({
			userId: from.userId,
			messageId: message.id,
		});
		answerTelegramCallback({ callbackId: message.cbId });
		return { OK: true, newBotContext: undefined };
	} catch (e) {
		log.warn("Error with user cancel button.\n", e);
		return { OK: false, newBotContext: undefined };
	}
}

module.exports = { userCancel };
