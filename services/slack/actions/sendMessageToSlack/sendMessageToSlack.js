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
	switch (message.type) {
		case "broadcastSuccess":
			web.chat.postMessage(broadcastSuccess({ from, message, data }));
			break;
		case "dmSuccess":
			web.chat.postMessage(dmSuccess({ from, message, data }));
			break;
		case "closeThreadManual":
			web.chat.postMessage(closeThreadManual({ from, to }));
			break;
		case "reopenThreadManual":
			web.chat.postMessage(reopenThreadManual({ from, to }));
			break;
		default:
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
