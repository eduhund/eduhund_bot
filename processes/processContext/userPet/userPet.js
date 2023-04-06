const { getDBRequest } = require("@mg/requests");
const { sendMessageToTelegram } = require("@tg/actions/actions");

async function userPet({ userId }) {
	const now = Date.now();

	if (userId) {
		sendMessageToTelegram({
			userId,
			intent: "cat",
			lang: "ru",
		});

		getDBRequest("addAction", {
			query: {
				userId,
				role: "student",
				actionCode: 007,
				action: "Pet the cat",
				ts: now,
			},
		});
	}

	return { OK: true, newBotContext: undefined };
}

module.exports = { userPet };
