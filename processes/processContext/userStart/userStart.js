const { getDBRequest } = require("@mg/requests");
const { sendMessageToTelegram } = require("@tg/actions/actions");

async function userStart({ telegramUser }) {
	const now = Date.now();
	const user = await getDBRequest("getUserInfo", {
		query: { userId: telegramUser?.id },
	});

	if (user) {
		const email = user.email;
		sendMessageToTelegram({
			telegramUserId: telegramUser?.id,
			intent: email ? "startStudent" : "startExist",
			lang: "ru",
			data: {
				firstName: telegramUser?.first_name || "студент",
			},
		});
		if (user?.blocked)
			getDBRequest("updateUserInfo", {
				query: { userId: telegramUser?.id },
				data: { blocked: false },
			});
	} else {
		sendMessageToTelegram({
			telegramUserId: telegramUser?.id,
			intent: "startNew",
			lang: "ru",
		});

		getDBRequest("addUser", {
			query: {
				userId: telegramUser?.id,
				username: telegramUser?.username,
				firstName: telegramUser?.first_name,
				lastName: telegramUser?.last_name,
				subscribeDate: {
					$date: {
						$numberLong: now,
					},
				},
				blocked: false,
				lang: telegramUser?.language_code,
			},
		});
	}

	getDBRequest("addAction", {
		query: {
			userId: telegramUser?.id,
			role: "student",
			actionCode: 001,
			action: "Start bot",
			ts: now,
		},
	});

	return { OK: true, newBotContext: undefined };
}

module.exports = { userStart };
