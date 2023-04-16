const {
	sendMessageToTelegram,
} = require("./sendMessageToTelegram/sendMessageToTelegram");
const {
	deleteTelegramMessage,
} = require("./deleteTelegramMessage/deleteTelegramMessage");
const {
	answerTelegramCallback,
} = require("./answerTelegramCallback/answerTelegramCallback");
const {
	forwardMessageToTelegram,
} = require("./forwardMessageToTelegram/forwardMessageToTelegram");

module.exports = {
	sendMessageToTelegram,
	forwardMessageToTelegram,
	deleteTelegramMessage,
	answerTelegramCallback,
};
