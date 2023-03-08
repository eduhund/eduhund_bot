const mainMessage = require("../../messageBuilder/mainMessage/mainMessage");
const { web } = require("../../slack");

async function sendMessageToSlack({ user, message, att }) {
  await web.chat.postMessage(mainMessage({ user, message, att }));
}

module.exports = sendMessageToSlack;
