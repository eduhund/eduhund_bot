const { log } = require("../../../services/log/log");
const { sendMessageToTelegram } = require("@tg/actions/actions");

async function otherModules({ from }) {
	try {
		sendMessageToTelegram({
			to: from,
			intent: "otherModules",
			lang: "ru", //from.lang
		});
		return { OK: true, newBotContext: undefined };
	} catch (e) {
		log.warn("Error with sending other modules.\n", e);
		sendMessageToTelegram({
			to: from,
			intent: "error",
			lang: "ru", //from.lang
		});
		return { OK: false, newBotContext: undefined };
	}
}

module.exports = { otherModules };
