function mainMessage({ from, to, message }) {
	const { email, username, firstName, lastName, modules } = from;
	const { text, att = {} } = message;
	const informerMessage = `${firstName} ${lastName}: ${text}`;
	const userInfo = `*<https://t.me/${username}|${firstName} ${lastName}>*${
		email ? ` / ${email}` : ""
	}${modules ? ` / ${modules.join(", ")}` : ""}`;
	return {
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
					text: text || " ",
					emoji: true,
				},
			},
			...(att?.image
				? [
						{
							type: "image",
							image_url: att.image,
							alt_text: "An incredibly cute kitten.",
						},
				  ]
				: []),
			...(att?.document
				? [
						{
							type: "section",
							text: {
								type: "mrkdwn",
								text: `*<${att.document}|Посмотреть вложение>*`,
							},
						},
				  ]
				: []),
		],
	};
}

module.exports = { mainMessage };
