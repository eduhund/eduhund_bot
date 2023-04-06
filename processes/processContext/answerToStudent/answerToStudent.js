const { getDBRequest } = require("@mg/requests");
const { processActions } = require("../../processActions/processActions");
const { forwardMessageToTelegram } = require("@tg/actions/actions");

async function answerToStudent({ slackUserId, threadTs, text, att }) {
	const now = Date.now();
	const thread = await getDBRequest("getThread", {
		query: { threadId: threadTs },
	});
	telegramUserId = thread?.userId;

	forwardMessageToTelegram({ telegramUserId, text, att });

	const query = {
		userId: slackUserId,
		source: "slack",
		dest: "telegram",
		role: "teacher",
		text,
		ts: now,
		threadId: threadTs,
	};

	getDBRequest("addToHistory", {
		query,
	});

	if (!thread.active) {
		processActions("sReopenThread", {
			userId: slackUserId,
			channel: process.env.SLACK_CHANNEL,
			ts: threadTs,
		});
	}

	getDBRequest("updateThread", {
		query: { threadId: threadTs },
		data: {
			lastOutMessage: now,
			newMessage: {
				userId: slackUserId,
				source: "slack",
				dest: "telegram",
				role: "teacher",
				text,
				ts: now,
			},
		},
	});

	return { OK: true, newBotContext: undefined };
}

module.exports = { answerToStudent };
