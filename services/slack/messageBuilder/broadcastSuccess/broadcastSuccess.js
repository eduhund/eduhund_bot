function broadcastSuccess({ from, message, data }) {
	const form = {
		channel: process.env.SLACK_CHANNEL,
		text: `${from.username} вещает студентам`,
		blocks: [
			{
				type: "section",
				text: {
					type: "mrkdwn",
					text: `<@${from.userId}> отправил_a сообщение ${data.counter} студентам`,
				},
			},
			{
				type: "divider",
			},
			{
				type: "section",
				text: {
					type: "mrkdwn",
					text: `_${message.text}_`,
				},
			},
		],
	};

	return form;
}

module.exports = { broadcastSuccess };
