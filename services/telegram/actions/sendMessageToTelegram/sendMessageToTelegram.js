const { getPhrase } = require("@assets/dict/dict");
const { bot } = require("@tg/telegram");

async function sendMessageToTelegram({ telegramUserId, intent, lang, data }) {
  const text = getPhrase(lang, intent, data);
  await bot.telegram.sendMessage(telegramUserId, text);
}

module.exports = sendMessageToTelegram;
