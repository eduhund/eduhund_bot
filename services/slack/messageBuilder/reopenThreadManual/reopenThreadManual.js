function reopenThreadManual({ user, threadId }) {
	const form = {
		channel: process.env.SLACK_CHANNEL,
		text: "Тред снова открыт",
		thread_ts: threadId,
		blocks: [
			{
				type: "context",
				elements: [
					{
						type: "mrkdwn",
						text: `*<@${user.id}> снова открыл тред*`,
					},
				],
			},
		],
	};

	return form;
}

module.exports = { reopenThreadManual };
