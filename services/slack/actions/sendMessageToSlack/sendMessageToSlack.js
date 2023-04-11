const {
	mainMessage,
	threadMessage,
	broadcastSuccess,
	dmSuccess,
	closeThreadManual,
	reopenThreadManual,
	catReport,
} = require("../../messageBuilder/messageBuilder");

const { web } = require("../../slack");

async function sendMessageToSlack({ from, to, message, data }) {
	const messageType = {
		broadcastSuccess,
		dmSuccess,
		closeThreadManual,
		reopenThreadManual,
		catReport,
	};

	const messageFn = messageType[message.type];
	if (messageFn) {
		web.chat.postMessage(messageFn({ from, to, message, data }));
	} else {
		if (!to?.threadId) {
			const response = await web.chat.postMessage(
				mainMessage({ from, to, message })
			);
			return response?.ts;
		} else {
			await web.chat.postMessage(threadMessage({ from, to, message }));
			return to.threadId;
		}
	}
}

module.exports = { sendMessageToSlack };
