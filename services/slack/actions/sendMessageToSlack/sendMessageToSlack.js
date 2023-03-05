const { web } = require("../../slack");

const channel = process.env.SLACK_CHANNEL;

async function sendMessageToSlack({ message }) {
  await web.chat.postMessage({
    channel,
    text: message,
  });
}

module.exports = sendMessageToSlack;
