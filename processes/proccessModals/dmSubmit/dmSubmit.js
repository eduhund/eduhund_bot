const { getDBRequest } = require("@mg/requests");
const { sendMessageToSlack } = require("@sl/actions/actions");
const { forwardMessageToTelegram } = require("@tg/actions/actions");

async function dmSubmit({ view, user }) {
	const now = Date.now();

	const users = view.state.values.users.usersList.selected_options;
	const userIds = users.map((userItem) => userItem.value);
	const userEmails = users.map((userItem) => userItem.text.text);
	const text = view.state.values.message.text.value || "";

	let counter = 0;

	for (const userId of userIds) {
		forwardMessageToTelegram({ telegramUserId: userId, text });
		counter++;
	}

	sendMessageToSlack({
		type: "dmSuccess",
		text,
		user,
		data: { counter, users: userEmails },
	});

	getDBRequest("addAction", {
		query: {
			userId: user.id,
			role: "teacher",
			actionCode: 11,
			action: "Send direct message to some users",
			ts: now,
		},
	});
}

module.exports = { dmSubmit };
