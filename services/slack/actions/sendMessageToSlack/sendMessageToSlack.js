const mainMessage = require("@sl/messageBuilder/mainMessage/mainMessage");
const threadMessage = require("@sl/messageBuilder/threadMessage/threadMessage");

const { web } = require("@sl/slack");

async function sendMessageToSlack({ user, text, threadTs, att }) {
  if (!threadTs) {
    const response = await web.chat.postMessage(
      mainMessage({ user, text, att })
    );
    return response?.ts;
  } else {
    await web.chat.postMessage(threadMessage({ user, text, threadTs, att }));
    return threadTs;
  }
}

module.exports = sendMessageToSlack;
