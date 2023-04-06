const { mainMessage } = require("./mainMessage/mainMessage");
const { threadMessage } = require("./threadMessage/threadMessage");
const { broadcastModal } = require("./broadcastModal/broadcastModal");
const { broadcastSuccess } = require("./broadcastSuccess/broadcastSuccess");
const { dmModal } = require("./dmModal/dmModal");
const { dmSuccess } = require("./dmSuccess/dmSuccess");
const { closeThreadManual } = require("./closeThreadManual/closeThreadManual");
const {
	reopenThreadManual,
} = require("./reopenThreadManual/reopenThreadManual");

const slackMessages = {
	mainMessage,
	threadMessage,
	broadcastModal,
	broadcastSuccess,
	dmModal,
	dmSuccess,
	closeThreadManual,
	reopenThreadManual,
};

module.exports = slackMessages;
