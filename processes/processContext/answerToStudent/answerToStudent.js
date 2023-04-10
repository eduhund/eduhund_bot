const { log } = require("../../../services/log/log");
const getDBRequest = require("@mg/requests");
const { processActions } = require("../../processActions/processActions");
const { forwardMessageToTelegram } = require("@tg/actions/actions");

async function answerToStudent({ from, message }) {
	try {
		const now = Date.now();
		const { userId } = from;
		const { threadId, text } = message;

		const thread = await getDBRequest("getThread", {
			query: { threadId },
		});

		const to = {
			userId: thread?.userId,
		};

		await forwardMessageToTelegram({ to, message });

		const newMessage = {
			userId,
			source: "slack",
			dest: "telegram",
			role: "teacher",
			text,
			ts: now,
		};

		await getDBRequest("addToHistory", {
			query: {
				...newMessage,
				threadId,
			},
		});

		if (!thread.active) {
			await processActions("sReopenThread", { from, message });
		}

		await getDBRequest("updateThread", {
			query: { threadId },
			data: {
				lastOutMessage: now,
				newMessage,
			},
		});
		return { OK: true, newBotContext: undefined };
	} catch (e) {
		log.warn("Error with processing answering student to Telegram.\n", e);
		return { OK: false, newBotContext: undefined };
	}
}

module.exports = { answerToStudent };
