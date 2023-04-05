function broadcastSuccess({ text, data }) {
	const form = {
		channel: process.env.SLACK_CHANNEL,
		text: `${data.author} вещает студентам`,
		blocks: [
			{
				type: "section",
				text: {
					type: "plain_text",
					text: `${data.author} отправил_a сообщение ${data.counter} студентам`,
					emoji: true,
				},
			},
			{
				type: "divider",
			},
			{
				type: "section",
				text: {
					type: "mrkdwn",
					text: `_${text}_`,
				},
			},
		],
	};

	return form;
}

module.exports = broadcastSuccess;
