const { bot } = require("@tg/telegram");

async function deleteTelegramMessage({ userId, messageId }) {
	await bot.telegram.deleteMessage(userId, messageId);
}

module.exports = { deleteTelegramMessage };
