const { bot } = require("../../telegram");

async function forwardMessageToTelegram({ telegramUserId, text, att }) {
  if (att.length === 0) {
    await bot.telegram.sendMessage(telegramUserId, text);
  }
  if (att.length === 1 && att[0].type === "PNG") {
    await bot.telegram.sendPhoto(telegramUserId, att[0], { caption: text });
  }
}

module.exports = forwardMessageToTelegram;
