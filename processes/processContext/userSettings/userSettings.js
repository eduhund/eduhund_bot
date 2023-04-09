const { log } = require("../../../services/log/log");
const getDBRequest = require("@mg/requests");
const { sendMessageToTelegram } = require("@tg/actions/actions");

async function userSettings({ from }) {
	try {
		const now = Date.now();

		sendMessageToTelegram({
			to: from,
			intent: "settings",
			lang: "ru", //from.lang
		});

		getDBRequest("addAction", {
			query: {
				userId: from.userId,
				role: "student",
				actionCode: 3,
				action: "Request settings",
				ts: now,
			},
		});
		return { OK: true, newBotContext: undefined };
	} catch (e) {
		log.warn("Error while processing user settings.\n", e);
		return { OK: false, newBotContext: undefined };
	}
}

module.exports = { userSettings };
