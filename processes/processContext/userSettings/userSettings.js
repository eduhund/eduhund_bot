const { log } = require("../../../services/log/log");
const getDBRequest = require("@mg/requests");
const getActionQuery = require("../../../utils/actionsQueries");
const { sendMessageToTelegram } = require("@tg/actions/actions");

const LANG = "ru";

async function userSettings({ from }) {
	try {
		sendMessageToTelegram({
			to: from,
			intent: "settings",
			lang: from.lang || LANG,
		});

		getDBRequest("addAction", getActionQuery(3, "student", from.userId));
		return { OK: true, newBotContext: undefined };
	} catch (e) {
		log.warn("Error while processing user settings.\n", e);
		return { OK: false, newBotContext: undefined };
	}
}

module.exports = { userSettings };
