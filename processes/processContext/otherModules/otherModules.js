const { sendMessageToTelegram } = require("@tg/actions/actions");

async function otherModules({ userId }) {
	if (userId) {
		sendMessageToTelegram({
			userId,
			intent: "otherModules",
			lang: "ru",
		});
	}

	return { OK: true, newBotContext: undefined };
}

module.exports = { otherModules };
