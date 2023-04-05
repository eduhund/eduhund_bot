function dmSuccess({ text, user, data }) {
	const form = {
		channel: process.env.SLACK_CHANNEL,
		text: `${user.name} пишет студентам в личку`,
		blocks: [
			{
				type: "section",
				text: {
					type: "mrkdwn",
					text: `<@${user.id}> отправил_a сообщение ${
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
					text: `_${text}_`,
				},
			},
		],
	};

	return form;
}

module.exports = dmSuccess;
