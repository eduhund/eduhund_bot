const { log } = require("../../../../services/log/log");

const {
	mainMessage,
	threadMessage,
	broadcastSuccess,
	dmSuccess,
	closeThreadManual,
	reopenThreadManual,
	catReport,
	taskComment
} = require("../../messageBuilder/messageBuilder");

const { web } = require("../../slack");

async function sendMessageToSlack({ from, to, message, data }) {
	const messageType = {
		broadcastSuccess,
		dmSuccess,
		closeThreadManual,
		reopenThreadManual,
		catReport,
		taskComment
	};

	const messageFn = messageType[message.type];
	if (messageFn) {
		await web.chat.postMessage(messageFn({ from, to, message, data }));
		log.debug("Slack — Message has been sent: ", { from, to, message, data });
	} else {
		if (!to?.threadId) {
			const response = await web.chat.postMessage(
				mainMessage({ from, to, message })
			);
			log.debug("Slack — Message has been sent: ", { from, to, message, data });
			return response?.ts;
		} else {
			await web.chat.postMessage(threadMessage({ from, to, message }));
			log.debug("Slack — Message has been sent: ", { from, to, message, data });
			return to.threadId;
		}
	}
}

module.exports = { sendMessageToSlack };
