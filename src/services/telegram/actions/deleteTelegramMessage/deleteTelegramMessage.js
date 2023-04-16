const { log } = require("../../../../services/log/log");

const { bot } = require("@tg/telegram");

async function deleteTelegramMessage({ userId, messageId }) {
	await bot.telegram.deleteMessage(userId, messageId);
	log.debug("Telegram — Message has been deleted: ", {
		to: userId,
		messageId,
	});
}

module.exports = { deleteTelegramMessage };
