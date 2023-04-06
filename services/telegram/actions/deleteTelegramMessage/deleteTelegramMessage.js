const { bot } = require("@tg/telegram");

async function deleteTelegramMessage({ telegramUserId, messageId }) {
	await bot.telegram.deleteMessage(telegramUserId, messageId);
}

module.exports = { deleteTelegramMessage };
