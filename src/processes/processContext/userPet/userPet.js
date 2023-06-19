const { log } = require("../../../services/log/log");
const getDBRequest = require("@mg/requests");
const getActionQuery = require("../../../utils/actionsQueries");
const { sendMessageToTelegram } = require("@tg/actions/actions");

async function userPet({ from }) {
	try {
		const { userId, lang } = from;

		await getDBRequest("addAction", getActionQuery(8, "student", userId));

		await sendMessageToTelegram({
			to: from,
			intent: "cat",
			lang: lang,
		});

		return { OK: true, newBotContext: undefined };
	} catch (e) {
		log.warn("Error with petting kitty.\n", e);
		await sendMessageToTelegram({
			to: from,
			intent: "error",
			lang: from.lang,
		});
		return { OK: false, newBotContext: undefined };
	}
}

module.exports = { userPet };
