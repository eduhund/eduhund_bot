const { log } = require("../../../services/log/log");
const getDBRequest = require("@mg/requests");
const { sendMessageToTelegram } = require("@tg/actions/actions");

async function userHelp({ from }) {
	try {
		const now = Date.now();

		sendMessageToTelegram({
			to: from,
			intent: "help",
			lang: "ru", //from.lang
		});

		getDBRequest("addAction", {
			query: {
				userId: from.userId,
				role: "student",
				actionCode: 2,
				action: "Request help",
				ts: now,
			},
		});

		return { OK: true, newBotContext: undefined };
	} catch (e) {
		log.warn("Error while processing user help.\n", e);
		return { OK: false, newBotContext: undefined };
	}
}

module.exports = { userHelp };
