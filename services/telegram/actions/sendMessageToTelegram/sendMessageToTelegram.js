const { getPhrase } = require("../../../../assets/dict/dict");
const { bot } = require("../../telegram");

async function sendMessageToTelegram({ telegramUserId, intent, lang }) {
  const text = getPhrase(lang, intent);
  await bot.telegram.sendMessage(telegramUserId, text);
}

module.exports = sendMessageToTelegram;
