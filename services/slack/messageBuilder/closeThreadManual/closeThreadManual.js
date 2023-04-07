function closeThreadManual({ from, message }) {
	const form = {
		channel: process.env.SLACK_CHANNEL,
		text: "Тред закрыт",
		thread_ts: message.threadId,
		blocks: [
			{
				type: "context",
				elements: [
					{
						type: "mrkdwn",
						text: `*<@${from.userId}> закрыл этот тред*`,
					},
				],
			},
		],
	};

	return form;
}

module.exports = { closeThreadManual };
