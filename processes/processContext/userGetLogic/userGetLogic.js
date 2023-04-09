const { log } = require("../../../services/log/log");
const getDBRequest = require("@mg/requests");
const getActionQuery = require("../../../utils/actionsQueries");
const { sendMessageToTelegram } = require("@tg/actions/actions");
const { getLogicModule } = require("@utils/getLogicModule");

const LANG = "ru";

async function userGetLogic({ from }) {
	try {
		const url = await getLogicModule(from.userId);

		sendMessageToTelegram({
			to: from,
			intent: "userLogicModule",
			lang: LANG, //from.lang
			data: {
				url,
			},
			params: {
				noLink: true,
			},
		});

		getDBRequest("addAction", getActionQuery(9, "student", from.userId));
		return { OK: true, newBotContext: undefined };
	} catch (e) {
		log.warn("Error with sending logic module.\n", e);
		sendMessageToTelegram({
			to: from,
			intent: "error",
			lang: LANG, //from.lang
		});
		return { OK: false, newBotContext: undefined };
	}
}

module.exports = { userGetLogic };
