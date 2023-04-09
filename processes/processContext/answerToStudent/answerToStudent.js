const getDBRequest = require("@mg/requests");
const { processActions } = require("../../processActions/processActions");
const { forwardMessageToTelegram } = require("@tg/actions/actions");

async function answerToStudent({ from, message }) {
	const now = Date.now();
	try {
		const { userId } = from;
		const { threadId, text } = message;

		const thread = await getDBRequest("getThread", {
			query: { threadId },
		});

		const to = {
			userId: thread?.userId,
		};

		forwardMessageToTelegram({ to, message });

		getDBRequest("addToHistory", {
			query: {
				userId,
				source: "slack",
				dest: "telegram",
				role: "teacher",
				text,
				ts: now,
				threadId,
			},
		});

		if (!thread.active) {
			processActions("sReopenThread", { from, message });
		}

		getDBRequest("updateThread", {
			query: { threadId },
			data: {
				lastOutMessage: now,
				newMessage: {
					userId,
					source: "slack",
					dest: "telegram",
					role: "teacher",
					text,
					ts: now,
				},
			},
		});
		return { OK: true, newBotContext: undefined };
	} catch (e) {
		log.warn("Error with processing answering student to Telegram.\n", e);
		return { OK: false, newBotContext: undefined };
	}
}

module.exports = { answerToStudent };
