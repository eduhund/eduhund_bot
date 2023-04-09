const { log } = require("../../../services/log/log");
const getDBRequest = require("@mg/requests");
const { sendMessageToSlack, addSlackReaction } = require("@sl/actions/actions");

async function closeThread({ from, message }) {
	const now = Date.now();

	try {
		const { channelId, threadId } = message;
		if (message.channelId !== process.env.SLACK_CHANNEL) {
			return undefined;
		}
		const query = { threadId, active: true };
		const data = { active: false };
		const newThreadStatus = await getDBRequest("updateThread", {
			query,
			data,
		});

		if (!newThreadStatus?.value) {
			return undefined;
		}

		message.type = "closeThreadManual";

		sendMessageToSlack({
			from,
			message,
		});

		addSlackReaction({
			type: "closeThread",
			channelId,
			threadId,
		});

		getDBRequest("addAction", {
			query: {
				userId: from.userId,
				role: "teacher",
				actionCode: 12,
				action: "Close thread",
				ts: now,
			},
		});
		return { OK: true, newBotContext: undefined };
	} catch (e) {
		log.warn("Error with closing thread.\n", e);
		return { OK: false, newBotContext: undefined };
	}
}

module.exports = { closeThread };
