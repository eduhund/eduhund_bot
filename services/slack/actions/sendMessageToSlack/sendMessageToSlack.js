const mainMessage = require("../../messageBuilder/mainMessage/mainMessage");
const threadMessage = require("../../messageBuilder/threadMessage/threadMessage");

const { getDBRequest } = require("../../../../services/database/requests");

const { web } = require("../../slack");

async function sendMessageToSlack({ user, message, threadTs, att }) {
  if (!threadTs) {
    const response = await web.chat.postMessage(
      mainMessage({ user, message, att })
    );
    const query = {
      telegramId: user.userId,
      type: "student",
      thread: response?.ts,
      message,
      active: true,
      lastMessage: Date.now(),
    };
    getDBRequest("addThread", {
      query,
    });
  } else {
    await web.chat.postMessage(threadMessage({ user, message, threadTs, att }));
  }
}

module.exports = sendMessageToSlack;
