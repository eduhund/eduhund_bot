const getDBRequest = require("@mg/requests");
const { sendMessageToSlack } = require("@sl/actions/actions");
const { forwardMessageToTelegram } = require("@tg/actions/actions");

async function broadcastSubmit({ from, message, data }) {
	const now = Date.now();

	try {
		const { modulesList } = data;
		const moduleIds = modulesList.map((moduleItem) => moduleItem.value);

		const users = [];

		for (const moduleId of moduleIds) {
			const students = await getDBRequest("getStudentsList", {
				query: { [`modules.${moduleId}`]: { $exists: true } },
				returns: ["email"],
			});
			const emails = students.map((item) => item.email);
			users.push(...emails);
		}

		const finalList = [...new Set(users)];

		let counter = 0;

		for (const email of finalList) {
			const user = await getDBRequest("getUserInfo", {
				query: { email },
				returns: ["userId"],
			});

			if (user) {
				const to = { userId: user.userId };
				forwardMessageToTelegram({ to, message });
				counter++;
			}
		}

		message.type = "broadcastSuccess";

		sendMessageToSlack({
			from,
			message,
			data: { counter },
		});

		getDBRequest("addAction", {
			query: {
				userId: from.userId,
				role: "teacher",
				actionCode: 10,
				action: "Send message to many users",
				ts: now,
			},
		});
		return { OK: true, newBotContext: undefined };
	} catch (e) {
		log.warn("Error with processing broadcasting to students.\n", e);
		return { OK: false, newBotContext: undefined };
	}
}

module.exports = { broadcastSubmit };
