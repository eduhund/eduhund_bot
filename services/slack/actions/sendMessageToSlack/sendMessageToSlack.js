const mainMessage = require("../../messageBuilder/mainMessage/mainMessage");
const { web } = require("../../slack");

async function sendMessageToSlack({ user, message }) {
  await web.chat.postMessage(mainMessage({ user, message }));
}

module.exports = sendMessageToSlack;
