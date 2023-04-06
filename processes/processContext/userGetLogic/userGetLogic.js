const { getDBRequest } = require("@mg/requests");
const { sendMessageToTelegram } = require("@tg/actions/actions");
const { getLogicModule } = require("@utils/getLogicModule");

async function userGetLogic({ userId }) {
	const now = Date.now();
	const url = await getLogicModule(userId);

	if (url) {
		sendMessageToTelegram({
			userId,
			intent: "userLogicModule",
			lang: "ru",
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
	} else {
		sendMessageToTelegram({
			userId,
			intent: "error",
			lang: "ru",
		});
	}

	return { OK: true, newBotContext: undefined };
}

module.exports = { userGetLogic };
