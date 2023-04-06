const { log } = require("../../../services/log/log");
const { getDBRequest } = require("@mg/requests");
const { sendMessageToSlack } = require("@sl/actions/actions");
const { sendMessageToTelegram } = require("@tg/actions/actions");

async function forwardMessageToSlack({ from, message }) {
	const now = Date.now();
	try {
		const user = await getDBRequest("getUserInfo", {
			query: { userId: from.userId },
		});

		if (!user) {
			log.warn("User not found in database.\n", from);
			return;
		}

		const activeModules = [];

		if (user.email) {
			from.email = user.email;
			const userModules = await getDBRequest("getStudentInfo", {
				query: { email: user.email },
				returns: ["modules"],
			});
			for (const [id, data] of Object.entries(userModules?.modules || {})) {
				const deadline = Date.parse(data.deadline);
				if (deadline > now) {
					activeModules.push(id);
				}
			}
			from.modules = activeModules;
		}

		const thread = await getDBRequest("getThread", {
			query: { userId: from.userId, active: true },
		});

		const to = {
			channelId: process.env.SLACK_CHANNEL,
			threadId: thread?.threadId,
		};

		const threadId = await sendMessageToSlack({
			from,
			to,
			message,
		});

		if (!to.threadId) {
			getDBRequest("createThread", {
				query: {
					userId: from.userId,
					source: "telegram",
					dest: "slack",
					role: "student",
					ts: now,
					text: message.text,
					threadId,
					active: true,
					talk: [],
					lastIncMessage: now,
				},
			});

			sendMessageToTelegram({
				to: from,
				intent: "newThread",
				lang: "ru", //from.lang
			});
		} else {
			getDBRequest("updateThread", {
				query: { threadId, active: true },
				data: {
					lastOutMessage: now,
					newMessage: {
						userId: from.userId,
						source: "telegram",
						dest: "slack",
						role: "student",
						text: message.text,
						ts: now,
					},
				},
			});

			getDBRequest("addToHistory", {
				query: {
					userId: from.userId,
					source: "telegram",
					dest: "slack",
					role: "student",
					ts: now,
					text: message.text,
					threadId,
				},
			});
		}

		return { OK: true, newBotContext: undefined };
	} catch (e) {
		log.warn("Error with processing forward user message to Slack.\n", e);
		return { OK: false, newBotContext: undefined };
	}
}

module.exports = { forwardMessageToSlack };
