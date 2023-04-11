const { log } = require("../../../services/log/log");
const getDBRequest = require("@mg/requests");
const getActionQuery = require("../../../utils/actionsQueries");
const { sendMessageToTelegram } = require("@tg/actions/actions");

async function userHelp({ from }) {
	try {
		sendMessageToTelegram({
			to: from,
			intent: "help",
			lang: from.lang,
		});

		getDBRequest("addAction", getActionQuery(2, "student", from.userId));

		return { OK: true, newBotContext: undefined };
	} catch (e) {
		log.warn("Error while processing user help.\n", e);
		return { OK: false, newBotContext: undefined };
	}
}

module.exports = { userHelp };
