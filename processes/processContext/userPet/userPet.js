const { getDBRequest } = require("@mg/requests");
const { sendMessageToTelegram } = require("@tg/actions/actions");

async function userPet({ telegramUser }) {
	const now = Date.now();

	if (telegramUser) {
		sendMessageToTelegram({
			telegramUserId: telegramUser?.id,
			intent: "cat",
			lang: "ru",
		});

		getDBRequest("addAction", {
			query: {
				userId: telegramUser?.id,
				role: "student",
				actionCode: 007,
				action: "Pet the cat",
				ts: now,
			},
		});
	}

	return { OK: true, newBotContext: undefined };
}

module.exports = userPet;
