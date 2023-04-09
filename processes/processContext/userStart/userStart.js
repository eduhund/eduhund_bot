const { log } = require("../../../services/log/log");
const getDBRequest = require("@mg/requests");
const { sendMessageToTelegram } = require("@tg/actions/actions");

async function userStart({ from }) {
	try {
		const now = Date.now();
		const user = await getDBRequest("getUserInfo", {
			query: { userId: from.userId },
		});

		if (user) {
			from.email = user.email;
			sendMessageToTelegram({
				to: from,
				intent: from.email ? "startStudent" : "startExist",
				lang: "ru", //from.lang
				data: {
					firstName: from.firstName || "студент",
				},
			});
			if (user?.blocked)
				getDBRequest("updateUserInfo", {
					query: { userId: from.userId },
					data: { blocked: false },
				});
		} else {
			sendMessageToTelegram({
				to: from,
				intent: "startNew",
				lang: "ru", //from.lang
			});

			getDBRequest("addUser", {
				query: {
					userId: from.userId,
					username: from.username,
					firstName: from.firstName,
					lastName: from.lastName,
					subscribeDate: {
						$date: {
							$numberLong: now,
						},
					},
					blocked: false,
					lang: from.lang,
				},
			});
		}

		getDBRequest("addAction", {
			query: {
				userId: from.userId,
				role: "student",
				actionCode: 1,
				action: "Start bot",
				ts: now,
			},
		});

		return { OK: true, newBotContext: undefined };
	} catch (e) {
		log.warn("Error while processing user start.\n", e);
		return { OK: false, newBotContext: undefined };
	}
}

module.exports = { userStart };
