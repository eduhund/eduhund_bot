const { getDBRequest } = require("@mg/requests");
const { removeSlackReaction } = require("@sl/actions/actions");

async function reopenThread({ userId, sChannelId, threadId }) {
	if (sChannelId !== process.env.SLACK_CHANNEL) {
		return undefined;
	}
	const now = Date.now();
	const query = { threadId, active: false };
	const data = { active: true };
	const newThreadStatus = await getDBRequest("updateThread", {
		query,
		data,
	});

	if (!newThreadStatus?.value) {
		return undefined;
	}

	removeSlackReaction({
		rChannelId: sChannelId,
		type: "reopenThread",
		threadId,
	});

	getDBRequest("addAction", {
		query: {
			userId,
			role: "teacher",
			actionCode: 13,
			action: "Reopen thread",
			ts: now,
		},
	});
}

module.exports = { reopenThread };
