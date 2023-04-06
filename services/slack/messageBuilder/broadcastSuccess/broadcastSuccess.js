function broadcastSuccess({ text, user, data }) {
	const form = {
		channel: process.env.SLACK_CHANNEL,
		text: `${user.name} вещает студентам`,
		blocks: [
			{
				type: "section",
				text: {
					type: "mrkdwn",
					text: `<@${user.id}> отправил_a сообщение ${data.counter} студентам`,
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

module.exports = { broadcastSuccess };
