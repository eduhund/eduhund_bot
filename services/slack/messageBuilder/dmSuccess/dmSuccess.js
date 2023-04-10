function dmSuccess({ from, message, data }) {
	return {
		channel: process.env.SLACK_CHANNEL,
		text: `${from.username} пишет студентам в личку`,
		blocks: [
			{
				type: "section",
				text: {
					type: "mrkdwn",
					text: `<@${from.userId}> отправил_a сообщение ${
						data.counter
					} студентам: ${data.users.join(", ")}`,
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

module.exports = { dmSuccess };
