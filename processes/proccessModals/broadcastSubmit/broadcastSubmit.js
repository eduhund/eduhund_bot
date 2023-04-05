const { getDBRequest } = require("@mg/requests");
const { sendMessageToSlack } = require("@sl/actions/actions");
const { forwardMessageToTelegram } = require("@tg/actions/actions");

async function broadcastSubmit({ view, user }) {
	const now = Date.now();

	const modules = view.state.values.modules.modulesList.selected_options;
	const moduleIds = modules.map((moduleItem) => moduleItem.value);
	const text = view.state.values.message.text.value || "";

	const users = [];

	for (const moduleId of moduleIds) {
		const query = { [`modules.${moduleId}`]: { $exists: true } };

		const data = await getDBRequest("getStudentsList", {
			query,
			returns: ["email"],
		});
		const emails = data.map((item) => item.email);
		users.push(...emails);
	}

	const finalList = [...new Set(users)];

	let counter = 0;

	for (const email of finalList) {
		const query = { email };
		const data = await getDBRequest("getUserInfo", {
			query,
			returns: ["userId"],
		});

		if (data) {
			const telegramUserId = data.userId;
			forwardMessageToTelegram({ telegramUserId, text });
			counter++;
		}
	}

	sendMessageToSlack({
		type: "broadcastSuccess",
		text,
		user,
		data: { counter },
	});

	getDBRequest("addAction", {
		query: {
			userId: user.id,
			role: "teacher",
			actionCode: 10,
			action: "Send message to many users",
			ts: now,
		},
	});
}

module.exports = { broadcastSubmit };
