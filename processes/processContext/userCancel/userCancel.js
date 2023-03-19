const { sendMessageToTelegram } = require("@tg/actions/actions");

async function userCancel({ telegramUser }) {
  if (telegramUser) {
    sendMessageToTelegram({
      telegramUserId: telegramUser?.id,
      intent: "userCancel",
      lang: "ru",
    });
  }

  return { OK: true, newBotContext: undefined };
}

module.exports = userCancel;
