const { getDBRequest } = require("@mg/requests");
const { sendMessageToTelegram } = require("@tg/actions/actions");

async function userHelp({ telegramUser }) {
  const now = Date.now();

  if (telegramUser) {
    sendMessageToTelegram({
      telegramUserId: telegramUser?.id,
      intent: "settings",
      lang: "ru",
    });

    getDBRequest("addAction", {
      query: {
        userId: telegramUser?.id,
        role: "student",
        actionCode: 003,
        action: "Request settings",
        ts: now,
      },
    });
  }

  return { OK: true, newBotContext: undefined };
}

module.exports = userHelp;
