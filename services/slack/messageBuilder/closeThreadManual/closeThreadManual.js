function closeThreadManual({ sUserId, threadId }) {
	const form = {
		channel: process.env.SLACK_CHANNEL,
		text: "Тред закрыт",
		thread_ts: threadId,
		blocks: [
			{
				type: "context",
				elements: [
					{
						type: "mrkdwn",
						text: `*<@${sUserId}> закрыл этот тред*`,
					},
				],
			},
		],
	};

	return form;
}

module.exports = { closeThreadManual };
