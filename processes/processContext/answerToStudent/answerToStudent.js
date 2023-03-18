const { getDBRequest } = require("@mg/requests");

const { forwardMessageToTelegram } = require("@tg/actions/actions");

async function answerToStudent({ slackId, threadTs, text, att }) {
  const now = Date.now();
  const thread = await getDBRequest("getThread", {
    query: { thread: threadTs, active: true },
  });
  telegramUserId = thread?.telegramUserId;

  forwardMessageToTelegram({ telegramUserId, text, att });

  return true;
}

module.exports = answerToStudent;
