const { bot } = require("@tg/telegram");

async function forwardMessageToTelegram({ to, message }) {
	const { userId } = to;
	const { text, att = [] } = message;
	if (att.length === 0) {
		await bot.telegram.sendMessage(userId, text);
	}
	if (att.length === 1) {
		const { type, url } = att[0];
		switch (type) {
			case "png":
			case "jpg":
				await bot.telegram.sendPhoto(userId, url, {
					caption: text,
				});
				break;
			case "pdf":
			case "zip":
				await bot.telegram.sendDocument(userId, url, {
					caption: text,
				});
				break;
			case "mpeg":
			case "mov":
				await bot.telegram.sendVideo(userId, url, {
					caption: text,
				});
				break;
			case "gif":
				await bot.telegram.sendAnimation(userId, url, {
					caption: text,
				});
				break;
		}
	}
}

module.exports = { forwardMessageToTelegram };
