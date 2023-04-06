function broadcastSuccess({ text, sUserId, sUsername, data }) {
	const form = {
		channel: process.env.SLACK_CHANNEL,
		text: `${sUsername} вещает студентам`,
		blocks: [
			{
				type: "section",
				text: {
					type: "mrkdwn",
					text: `<@${sUserId}> отправил_a сообщение ${data.counter} студентам`,
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
