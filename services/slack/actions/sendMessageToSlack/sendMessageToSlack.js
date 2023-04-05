const {
	mainMessage,
	threadMessage,
	broadcastSuccess,
	dmSuccess,
} = require("@sl/messageBuilder/messageBuilder");

const { web } = require("@sl/slack");

async function sendMessageToSlack({ type, user, text, threadId, att, data }) {
	switch (type) {
		case "broadcastSuccess":
			web.chat.postMessage(broadcastSuccess({ text, user, data }));
			break;
		case "dmSuccess":
			web.chat.postMessage(dmSuccess({ text, user, data }));
			break;
		default:
			if (!threadId) {
				const response = await web.chat.postMessage(
					mainMessage({ user, text, att })
				);
				return response?.ts;
			} else {
				await web.chat.postMessage(
					threadMessage({ user, text, threadId, att })
				);
				return threadId;
			}
	}
}

module.exports = sendMessageToSlack;
