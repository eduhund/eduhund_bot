const { getDBRequest } = require("@mg/requests");
const { processActions } = require("../../processActions/processActions");
const { forwardMessageToTelegram } = require("@tg/actions/actions");

async function answerToStudent({ sUserId, threadId, sMessage, sAtt }) {
	const now = Date.now();
	const thread = await getDBRequest("getThread", {
		query: { threadId: sThreadId },
	});
	const rUserId = thread?.userId;

	forwardMessageToTelegram({ rUserId, rMessage: sMessage, rAtt: sAtt });

	const query = {
		userId: sUserId,
		source: "slack",
		dest: "telegram",
		role: "teacher",
		text: sMessage,
		ts: now,
		threadId,
	};

	getDBRequest("addToHistory", {
		query,
	});

	if (!thread.active) {
		processActions("sReopenThread", {
			sUserId,
			rChannelId: process.env.SLACK_CHANNEL,
			threadId,
		});
	}

	getDBRequest("updateThread", {
		query: { threadId: sThreadId },
		data: {
			lastOutMessage: now,
			newMessage: {
				userId: sUserId,
				source: "slack",
				dest: "telegram",
				role: "teacher",
				text: sMessage,
				ts: now,
			},
		},
	});

	return { OK: true, newBotContext: undefined };
}

module.exports = { answerToStudent };
