function reopenThreadManual({ from, message }) {
	const form = {
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

	return form;
}

module.exports = { reopenThreadManual };
