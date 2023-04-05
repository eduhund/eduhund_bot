const mainMessage = require("./mainMessage/mainMessage");
const threadMessage = require("./threadMessage/threadMessage");
const broadcastModal = require("./broadcastModal/broadcastModal");
const broadcastSuccess = require("./broadcastSuccess/broadcastSuccess");

const slackMessages = {
	mainMessage,
	threadMessage,
	broadcastModal,
	broadcastSuccess,
};

module.exports = slackMessages;
