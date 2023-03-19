const { getDBRequest } = require("@mg/requests");
const { sendMessageToTelegram } = require("@tg/actions/actions");

async function userHelp({ telegramUser }) {
  const now = Date.now();

  if (telegramUser) {
    sendMessageToTelegram({
      telegramUserId: telegramUser?.id,
      intent: "help",
      lang: "ru",
    });
    /*
    getDBRequest("updateUserInfo", {
      query: { userId: telegramUser?.id },
      data: { blocked: false },
    });
    */
  }

  return true;
}

module.exports = userHelp;
