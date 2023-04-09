const { log } = require("../../../services/log/log");
const { sendMessageToTelegram } = require("@tg/actions/actions");

const LANG = "ru";

async function otherModules({ from }) {
	try {
		sendMessageToTelegram({
			to: from,
			intent: "otherModules",
			lang: LANG, //from.lang
		});
		return { OK: true, newBotContext: undefined };
	} catch (e) {
		log.warn("Error with sending other modules.\n", e);
		sendMessageToTelegram({
			to: from,
			intent: "error",
			lang: LANG, //from.lang
		});
		return { OK: false, newBotContext: undefined };
	}
}

module.exports = { otherModules };
