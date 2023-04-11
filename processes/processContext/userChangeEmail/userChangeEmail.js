const { log } = require("../../../services/log/log");
const getDBRequest = require("@mg/requests");
const getActionQuery = require("../../../utils/actionsQueries");
const { sendMessageToTelegram } = require("@tg/actions/actions");

const LANG = "ru";

function getEmail(text) {
	return typeof text === "string" ? text.toLowerCase() : null;
}

async function userChangeEmailInit({ from }) {
	try {
		sendMessageToTelegram({
			to: from,
			intent: "changeEmailInit",
			lang: from.lang || LANG,
		});

		getDBRequest("addAction", getActionQuery(4, "student", from.userId));
		return { OK: true, newBotContext: "changeEmail" };
	} catch (e) {
		log.warn("Error with changing user email.\n", e);
		return { OK: false, newBotContext: undefined };
	}
}

async function changeEmailFail(from) {
	try {
		sendMessageToTelegram({
			to: from,
			intent: "changeEmailFail",
			lang: from.lang || LANG,
		});

		getDBRequest("addAction", getActionQuery(7, "student", from.userId));
		return { OK: true, newBotContext: "changeEmail" };
	} catch (e) {
		log.warn("Error with changing user email.\n", e);
		return { OK: false, newBotContext: undefined };
	}
}

async function changeEmailError(from) {
	try {
		sendMessageToTelegram({
			to: from,
			intent: "changeEmailError",
			lang: from.lang || LANG,
		});

		getDBRequest("addAction", getActionQuery(6, "student", from.userId));
		return { OK: true, newBotContext: "changeEmail" };
	} catch (e) {
		log.warn("Error with changing user email.\n", e);
		return { OK: false, newBotContext: undefined };
	}
}

async function changeEmailSuccess(from, email) {
	try {
		getDBRequest("updateUserInfo", {
			query: {
				userId: from.userId,
			},
			data: { email },
		});

		sendMessageToTelegram({
			to: from,
			intent: "changeEmailSuccess",
			lang: from.lang || LANG,
		});

		getDBRequest("addAction", getActionQuery(5, "student", from.userId));
		return { OK: true, newBotContext: undefined };
	} catch (e) {
		log.warn("Error with changing user email.\n", e);
		return { OK: false, newBotContext: undefined };
	}
}

async function userChangeEmail({ from, message }) {
	const extrudedEmail = getEmail(message.text);
	if (extrudedEmail) {
		const student = await getDBRequest("getStudentInfo", {
			query: { email: extrudedEmail },
		});
		if (student) {
			return changeEmailSuccess(from, extrudedEmail);
		} else {
			return changeEmailFail(from);
		}
	} else {
		return changeEmailError(from);
	}
}

module.exports = { userChangeEmail, userChangeEmailInit };
