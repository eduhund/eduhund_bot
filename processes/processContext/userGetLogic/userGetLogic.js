const { log } = require("../../../services/log/log");
const getDBRequest = require("@mg/requests");
const { sendMessageToTelegram } = require("@tg/actions/actions");
const { getLogicModule } = require("@utils/getLogicModule");

async function userGetLogic({ from }) {
	const now = Date.now();

	try {
		const url = await getLogicModule(from.userId);

		sendMessageToTelegram({
			to: from,
			intent: "userLogicModule",
			lang: "ru", //from.lang
			data: {
				url,
			},
			params: {
				noLink: true,
			},
		});

		getDBRequest("addAction", {
			query: {
				userId,
				role: "student",
				actionCode: 9,
				action: "Get logic",
				ts: now,
			},
		});
		return { OK: true, newBotContext: undefined };
	} catch (e) {
		log.warn("Error with sending logic module.\n", e);
		sendMessageToTelegram({
			to: from,
			intent: "error",
			lang: "ru", //from.lang
		});
		return { OK: false, newBotContext: undefined };
	}
}

module.exports = { userGetLogic };
