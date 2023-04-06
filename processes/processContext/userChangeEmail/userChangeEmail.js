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

async function changeEmailInit({ userId }) {
	const now = Date.now();

	if (userId) {
		sendMessageToTelegram({
			userId,
			intent: "changeEmailInit",
			lang: "ru",
		});

		getDBRequest("addAction", {
			query: {
				userId,
				role: "student",
				actionCode: 004,
				action: "Change email request",
				ts: now,
			},
		});
	}

	return { OK: true, newBotContext: "changeEmail" };
}

async function changeEmailFail({ userId }) {
	const now = Date.now();

	if (userId) {
		getDBRequest("addAction", {
			query: {
				userId,
				role: "student",
				actionCode: 005,
				action: "Change email fail",
				ts: now,
			},
		});

		sendMessageToTelegram({
			userId,
			intent: "changeEmailFail",
			lang: "ru",
		});
	}

	return { OK: true, newBotContext: "changeEmail" };
}

async function changeEmailError({ userId }) {
	const now = Date.now();

	if (userId) {
		sendMessageToTelegram({
			userId,
			intent: "changeEmailError",
			lang: "ru",
		});

		getDBRequest("addAction", {
			query: {
				userId,
				role: "student",
				actionCode: 005,
				action: "Change email fail",
				ts: now,
			},
		});
	}

	return { OK: true, newBotContext: "changeEmail" };
}

async function changeEmailSuccess({ userId, email }) {
	const now = Date.now();

	if (userId) {
		getDBRequest("addAction", {
			query: {
				userId,
				role: "student",
				actionCode: 006,
				action: "Change email success",
				ts: now,
			},
		});

		getDBRequest("updateUserInfo", {
			query: {
				userId,
			},
			data: { email },
		});

		sendMessageToTelegram({
			userId,
			intent: "changeEmailSuccess",
			lang: "ru",
		});
	}

	return { OK: true, newBotContext: undefined };
}

async function userChangeEmail({ userId, text, botContext }) {
	const now = Date.now();
	const user = await getDBRequest("getUserInfo", {
		query: { userId },
	});

	if (!botContext) {
		return changeEmailInit({ userId });
	}

	const currentEmail = user?.email;
	const extrudedEmail = getEmail(text);
	if (extrudedEmail) {
		const student = await getDBRequest("getStudentInfo", {
			query: { email: extrudedEmail },
		});
		if (student) {
			return changeEmailSuccess({ userId, email: extrudedEmail });
		} else {
			return changeEmailFail({ userId });
		}
	} else {
		return changeEmailError({ userId });
	}
}

module.exports = { userChangeEmail };
