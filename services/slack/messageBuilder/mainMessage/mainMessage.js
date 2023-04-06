function mainMessage({ from, to, message }) {
	const informerMessage = `${from.firstName} ${from.lastName}: ${message.text}`;
	var userInfo = `*<https://t.me/${from.username}|${from.firstName} ${from.lastName}>*`;
	if (from.email) {
		userInfo += ` / ${from.email}`;
	}
	if (from.modules) {
		userInfo += ` / ${from.modules.join(", ")}`;
	}
	const form = {
		channel: to.channelId,
		text: informerMessage,
		blocks: [
			{
				type: "context",
				elements: [
					{
						type: "mrkdwn",
						text: userInfo,
					},
				],
			},
			{
				type: "section",
				text: {
					type: "plain_text",
					text: message.text || " ",
					emoji: true,
				},
			},
		],
	};

	if (message.att?.image) {
		form.blocks.push({
			type: "image",
			image_url: message.att.image,
			alt_text: "An incredibly cute kitten.",
		});
	}

	if (message.att?.document) {
		form.blocks.push({
			type: "section",
			text: {
				type: "mrkdwn",
				text: `*<${message.att.document}|Посмотреть вложение>*`,
			},
		});
	}

	return form;
}

module.exports = { mainMessage };
