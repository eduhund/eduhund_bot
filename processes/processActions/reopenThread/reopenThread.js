const getDBRequest = require("@mg/requests");
const { removeSlackReaction } = require("@sl/actions/actions");

async function reopenThread({ from, message }) {
	const now = Date.now();
	try {
		const { channelId, threadId } = message;
		if (channelId !== process.env.SLACK_CHANNEL) {
			return undefined;
		}
		const newThreadStatus = await getDBRequest("updateThread", {
			query: { threadId, active: false },
			data: { active: true },
		});

		if (!newThreadStatus?.value) {
			return undefined;
		}

		removeSlackReaction({
			type: "reopenThread",
			channelId,
			threadId,
		});

		getDBRequest("addAction", {
			query: {
				userId: from.userId,
				role: "teacher",
				actionCode: 13,
				action: "Reopen thread",
				ts: now,
			},
		});
		return { OK: true, newBotContext: undefined };
	} catch (e) {
		log.warn("Error with reopening thread.\n", e);
		return { OK: false, newBotContext: undefined };
	}
}

module.exports = { reopenThread };
