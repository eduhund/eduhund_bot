const { getDBRequest } = require("@mg/requests");
const { sendMessageToSlack, addSlackReaction } = require("@sl/actions/actions");

async function closeThread({ user, channel, message_ts }) {
	const userId = user.id;
	const channelId = channel.id;
	const threadId = message_ts;
	if (channelId !== process.env.SLACK_CHANNEL) {
		return undefined;
	}
	const now = Date.now();
	const query = { threadId, active: true };
	const data = { active: false };
	const newThreadStatus = await getDBRequest("updateThread", {
		query,
		data,
	});

	if (!newThreadStatus?.value) {
		return undefined;
	}

	sendMessageToSlack({
		type: "closeThreadManual",
		user: { id: userId },
		threadId,
	});

	addSlackReaction({ channelId, type: "closeThread", threadId });

	getDBRequest("addAction", {
		query: {
			userId,
			role: "teacher",
			actionCode: 12,
			action: "Close thread",
			ts: now,
		},
	});
}

module.exports = { closeThread };
