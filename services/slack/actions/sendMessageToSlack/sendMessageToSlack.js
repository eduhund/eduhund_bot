const {
	mainMessage,
	threadMessage,
	broadcastSuccess,
	dmSuccess,
	closeThreadManual,
	reopenThreadManual,
} = require("@sl/messageBuilder/messageBuilder");

const { web } = require("@sl/slack");

async function sendMessageToSlack({ from, to, message, data }) {
	const messageType = {
		broadcastSuccess: broadcastSuccess,
		dmSuccess: dmSuccess,
		closeThreadManual: closeThreadManual,
		reopenThreadManual: reopenThreadManual,
	};

	const messageFn = messageType[message.type];
	if (messageFn) {
		web.chat.postMessage(messageFn({ from, message, data }));
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
