function closeThreadManual({ from, message }) {
	return {
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
}

module.exports = { closeThreadManual };
