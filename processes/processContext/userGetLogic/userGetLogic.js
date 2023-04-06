const { getDBRequest } = require("@mg/requests");
const { sendMessageToTelegram } = require("@tg/actions/actions");
const { getLogicModule } = require("@utils/getLogicModule");

async function userGetLogic({ telegramUser }) {
	const now = Date.now();
	const url = await getLogicModule(telegramUser?.id);

	if (url) {
		sendMessageToTelegram({
			telegramUserId: telegramUser?.id,
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
				userId: telegramUser?.id,
				role: "student",
				actionCode: 9,
				action: "Get logic",
				ts: now,
			},
		});
	} else {
		sendMessageToTelegram({
			telegramUserId: telegramUser?.id,
			intent: "error",
			lang: "ru",
		});
	}

	return { OK: true, newBotContext: undefined };
}

module.exports = { userGetLogic };
