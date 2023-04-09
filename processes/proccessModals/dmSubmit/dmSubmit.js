const getDBRequest = require("@mg/requests");
const { sendMessageToSlack } = require("@sl/actions/actions");
const { forwardMessageToTelegram } = require("@tg/actions/actions");

async function dmSubmit({ from, message, data }) {
	const now = Date.now();

	try {
		const { usersList } = data;
		const userIds = usersList.map((userItem) => userItem.value);
		const userEmails = usersList.map((userItem) => userItem.text.text);

		let counter = 0;

		for (const userId of userIds) {
			forwardMessageToTelegram({ to: { userId }, message });
			counter++;
		}

		message.type = "dmSuccess";

		sendMessageToSlack({
			from,
			message,
			data: { counter, users: userEmails },
		});

		getDBRequest("addAction", {
			query: {
				userId: from.userId,
				role: "teacher",
				actionCode: 11,
				action: "Send direct message to some users",
				ts: now,
			},
		});

		return { OK: true, newBotContext: undefined };
	} catch (e) {
		log.warn("Error with processing DM to students.\n", e);
		return { OK: false, newBotContext: undefined };
	}
}

module.exports = { dmSubmit };
