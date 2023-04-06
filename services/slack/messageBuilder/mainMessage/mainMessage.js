function mainMessage({ user, text, att }) {
	const informerMessage = `${user?.firstName} ${user?.lastName}: ${text}`;
	var userInfo = `*<https://t.me/${user?.username}|${user?.firstName} ${user?.lastName}>*`;
	if (user?.email) {
		userInfo += ` / ${user?.email}`;
	}
	if (user?.modules) {
		userInfo += ` / ${user.modules.join(", ")}`;
	}
	const form = {
		channel: process.env.SLACK_CHANNEL,
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
					text: text || " ",
					emoji: true,
				},
			},
		],
	};

	if (att.image) {
		form.blocks.push({
			type: "image",
			image_url: att.image,
			alt_text: "An incredibly cute kitten.",
		});
	}

	if (att.document) {
		form.blocks.push({
			type: "section",
			text: {
				type: "mrkdwn",
				text: `*<${att.document}|Посмотреть вложение>*`,
			},
		});
	}

	return form;
}

module.exports = { mainMessage };
