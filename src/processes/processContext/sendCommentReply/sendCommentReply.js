const { log } = require("../../../services/log/log");
const getDBRequest = require("@mg/requests");
const { processActions } = require("../../processActions/processActions");
const { forwardMessageToTelegram } = require("@tg/actions/actions");
const { sendMail } = require("../../../services/taskbook/taskbook");

async function sendCommentReply({ from, message }) {
	try {
		const now = Date.now();
		const { threadId, text } = message;

		const comment = await getDBRequest("getTaskComment", {
			query: { threadId },
		});

    const data = {
      email: comment.email,
      content: {
        taskId: comment.taskId,
        question: comment.text,
        answer: text.replace("<@U04SQQV7VPS>", "")
      }
    }

    await sendMail(data)

		return { OK: true, newBotContext: undefined };
	} catch (e) {
		log.warn("Error with processing answering to student's comment.\n", e);
		return { OK: false, newBotContext: undefined };
	}
}

module.exports = { sendCommentReply };