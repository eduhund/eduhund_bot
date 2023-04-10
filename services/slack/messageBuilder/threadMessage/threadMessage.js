function threadMessage({ from, to, message }) {
	const { firstName, lastName } = from;
	const { text, att = {} } = message;
	const informerMessage = `${firstName} ${lastName}: ${text}`;
	return {
		channel: to.channelId,
		text: informerMessage,
		thread_ts: to.threadId,
		blocks: [
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

module.exports = { threadMessage };
