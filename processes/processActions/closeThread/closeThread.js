const { getDBRequest } = require("@mg/requests");
const { sendMessageToSlack, addSlackReaction } = require("@sl/actions/actions");

async function closeThread({ sUserId, sUsername, sChannelId, threadId }) {
	if (sChannelId !== process.env.SLACK_CHANNEL) {
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
		sUserId,
		sUsername,
		threadId,
	});

	addSlackReaction({
		rChannelId: sChannelId,
		type: "closeThread",
		threadId,
	});

	getDBRequest("addAction", {
		query: {
			userId: sUserId,
			role: "teacher",
			actionCode: 12,
			action: "Close thread",
			ts: now,
		},
	});
}

module.exports = { closeThread };
