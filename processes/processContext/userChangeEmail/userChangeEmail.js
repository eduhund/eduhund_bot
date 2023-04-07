const { getDBRequest } = require("@mg/requests");
const { sendMessageToTelegram } = require("@tg/actions/actions");

function getEmail(text) {
	try {
		const lowerText = text.toLowerCase();
		return lowerText;
	} catch {
		return null;
	}
}

async function userChangeEmailInit({ from }) {
	const now = Date.now();

	try {
		sendMessageToTelegram({
			to: from,
			intent: "changeEmailInit",
			lang: "ru", //user.lang
		});

		getDBRequest("addAction", {
			query: {
				userId: from.userId,
				role: "student",
				actionCode: 4,
				action: "Change email request",
				ts: now,
			},
		});
		return { OK: true, newBotContext: "changeEmail" };
	} catch (e) {
		log.warn("Error with changing user email.\n", e);
		return { OK: false, newBotContext: undefined };
	}
}

async function changeEmailFail(user) {
	const now = Date.now();

	try {
		sendMessageToTelegram({
			to: user,
			intent: "changeEmailFail",
			lang: "ru", //user.lang
		});

		getDBRequest("addAction", {
			query: {
				userId: user.userId,
				role: "student",
				actionCode: 7,
				action: "Change email fail",
				ts: now,
			},
		});
		return { OK: true, newBotContext: "changeEmail" };
	} catch (e) {
		log.warn("Error with changing user email.\n", e);
		return { OK: false, newBotContext: undefined };
	}
}

async function changeEmailError(user) {
	const now = Date.now();

	try {
		sendMessageToTelegram({
			to: user,
			intent: "changeEmailError",
			lang: "ru", //user.lang
		});

		getDBRequest("addAction", {
			query: {
				userId: user.userId,
				role: "student",
				actionCode: 6,
				action: "Change email error",
				ts: now,
			},
		});
		return { OK: true, newBotContext: "changeEmail" };
	} catch (e) {
		log.warn("Error with changing user email.\n", e);
		return { OK: false, newBotContext: undefined };
	}
}

async function changeEmailSuccess(user, email) {
	const now = Date.now();

	try {
		getDBRequest("updateUserInfo", {
			query: {
				userId: user.userId,
			},
			data: { email },
		});

		sendMessageToTelegram({
			to: user,
			intent: "changeEmailSuccess",
			lang: "ru", //user.lang
		});

		getDBRequest("addAction", {
			query: {
				userId: user.userId,
				role: "student",
				actionCode: 5,
				action: "Change email success",
				ts: now,
			},
		});
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
