const { log } = require("../../../services/log/log");
const { getDBRequest } = require("@mg/requests");
const { sendMessageToTelegram } = require("@tg/actions/actions");

async function userPet({ from }) {
	const now = Date.now();

	try {
		sendMessageToTelegram({
			to: from,
			intent: "cat",
			lang: "ru", //from.lang
		});

		getDBRequest("addAction", {
			query: {
				userId: from.userId,
				role: "student",
				actionCode: 8,
				action: "Pet the cat",
				ts: now,
			},
		});
		return { OK: true, newBotContext: undefined };
	} catch (e) {
		log.warn("Error with petting kitty.\n", e);
		sendMessageToTelegram({
			to: from,
			intent: "error",
			lang: "ru", //from.lang
		});
		return { OK: false, newBotContext: undefined };
	}
}

module.exports = { userPet };
