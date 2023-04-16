function reopenThreadManual({ from, message }) {
	return {
		channel: process.env.SLACK_CHANNEL,
		text: "Тред снова открыт",
		thread_ts: message.threadId,
		blocks: [
			{
				type: "context",
				elements: [
					{
						type: "mrkdwn",
						text: `*<@${from.userId}> снова открыл тред*`,
					},
				],
			},
		],
	};
}

module.exports = { reopenThreadManual };
