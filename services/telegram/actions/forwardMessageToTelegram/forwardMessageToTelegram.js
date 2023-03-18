const { bot } = require("../../telegram");

async function forwardMessageToTelegram({ telegramUserId, text, att }) {
  if (!att) {
    await bot.telegram.sendMessage(telegramUserId, text);
  }
}

module.exports = forwardMessageToTelegram;
