const { bot } = require("@tg/telegram");

async function forwardMessageToTelegram({ telegramUserId, text, att = [] }) {
	if (att.length === 0) {
		await bot.telegram.sendMessage(telegramUserId, text);
	}
	if (att.length === 1) {
		switch (att[0].type) {
			case "png":
			case "jpg":
				await bot.telegram.sendPhoto(telegramUserId, att[0].url, {
					caption: text,
				});
				break;
			case "pdf":
			case "zip":
				await bot.telegram.sendDocument(telegramUserId, att[0].url, {
					caption: text,
				});
				break;
			case "mpeg":
			case "mov":
				await bot.telegram.sendVideo(telegramUserId, att[0].url, {
					caption: text,
				});
				break;
			case "gif":
				await bot.telegram.sendAnimation(telegramUserId, att[0].url, {
					caption: text,
				});
				break;
		}
	}
}

module.exports = { forwardMessageToTelegram };
