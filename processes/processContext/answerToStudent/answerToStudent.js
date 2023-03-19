const { getDBRequest } = require("@mg/requests");

const { forwardMessageToTelegram } = require("@tg/actions/actions");

async function answerToStudent({ slackUserId, threadTs, text, att }) {
  const now = Date.now();
  const thread = await getDBRequest("getThread", {
    query: { threadId: threadTs, active: true },
  });
  telegramUserId = thread?.userId;

  forwardMessageToTelegram({ telegramUserId, text, att });

  const query = {
    userId: slackUserId,
    source: "slack",
    dest: "telegram",
    role: "teacher",
    text,
    ts: now,
    threadId: threadTs,
  };

  getDBRequest("addToHistory", {
    query,
  });

  getDBRequest("updateThread", {
    query: { threadId: threadTs, active: true },
    data: {
      lastOutMessage: now,
      newMessage: {
        userId: slackUserId,
        source: "slack",
        dest: "telegram",
        role: "teacher",
        text,
        ts: now,
      },
    },
  });

  return { OK: true, newBotContext: undefined };
}

module.exports = answerToStudent;
