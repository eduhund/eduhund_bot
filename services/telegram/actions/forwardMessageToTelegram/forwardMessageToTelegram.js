const { bot } = require("@tg/telegram");

async function forwardMessageToTelegram({ rUserId, rMessage, rAtt = [] }) {
	if (rAtt.length === 0) {
		await bot.telegram.sendMessage(rUserId, rMessage);
	}
	if (rAtt.length === 1) {
		switch (rAtt[0].type) {
			case "png":
			case "jpg":
				await bot.telegram.sendPhoto(rUserId, rAtt[0].url, {
					caption: rMessage,
				});
				break;
			case "pdf":
			case "zip":
				await bot.telegram.sendDocument(rUserId, rAtt[0].url, {
					caption: rMessage,
				});
				break;
			case "mpeg":
			case "mov":
				await bot.telegram.sendVideo(rUserId, rAtt[0].url, {
					caption: rMessage,
				});
				break;
			case "gif":
				await bot.telegram.sendAnimation(rUserId, rAtt[0].url, {
					caption: rMessage,
				});
				break;
		}
	}
}

module.exports = { forwardMessageToTelegram };
