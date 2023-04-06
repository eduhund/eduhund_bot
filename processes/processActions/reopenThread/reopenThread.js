const { getDBRequest } = require("@mg/requests");
const { removeSlackReaction } = require("@sl/actions/actions");

async function reopenThread({ userId, channel, ts }) {
	if (channel !== process.env.SLACK_CHANNEL) {
		return undefined;
	}
	const now = Date.now();
	const query = { threadId: ts, active: false };
	const data = { active: true };
	const newThreadStatus = await getDBRequest("updateThread", {
		query,
		data,
	});

	if (!newThreadStatus?.value) {
		return undefined;
	}

	removeSlackReaction({
		channelId: channel,
		type: "reopenThread",
		threadId: ts,
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
