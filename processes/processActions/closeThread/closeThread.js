const { getDBRequest } = require("@mg/requests");
const { sendMessageToSlack } = require("@sl/actions/actions");

async function closeThread({ userId, channel, ts }) {
	if (channel !== process.env.SLACK_CHANNEL) {
		return undefined;
	}
	const now = Date.now();
	const query = { threadId: ts, active: true };
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
		threadId: ts,
	});

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
