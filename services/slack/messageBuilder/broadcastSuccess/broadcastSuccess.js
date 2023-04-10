function broadcastSuccess({ from, message, data }) {
	return {
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
}

module.exports = { broadcastSuccess };
