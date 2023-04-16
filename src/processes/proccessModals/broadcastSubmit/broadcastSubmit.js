const { log } = require("../../../services/log/log");
const getDBRequest = require("@mg/requests");
const getActionQuery = require("../../../utils/actionsQueries");
const { sendMessageToSlack } = require("@sl/actions/actions");
const { forwardMessageToTelegram } = require("@tg/actions/actions");

async function broadcastSubmit({ from, message, data }) {
	try {
		const moduleIds = data.modulesList.map(({ value }) => value);

		const users = await Promise.all(
			moduleIds.map(async (moduleId) => {
				const students = await getDBRequest("getStudentsList", {
					query: { [`modules.${moduleId}`]: { $exists: true } },
					returns: ["email"],
				});
				return students.map(({ email }) => email);
			})
		);
		const finalList = [...new Set(users.flat())];

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

		sendMessageToSlack({ from, message, data: { counter } });

		getDBRequest("addAction", getActionQuery(10, "teacher", from.userId));
		return { OK: true, newBotContext: undefined };
	} catch (e) {
		log.warn("Error with processing broadcasting to students.\n", e);
		return { OK: false, newBotContext: undefined };
	}
}

module.exports = { broadcastSubmit };
