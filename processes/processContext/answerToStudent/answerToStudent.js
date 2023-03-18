const { getDBRequest } = require("../../../services/database/requests");

const {
  forwardMessageToTelegram,
} = require("../../../services/telegram/actions/actions");

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
