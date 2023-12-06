function taskComment({ from, to, message }) {
	const { email, firstName, lastName, taskId, taskName } = from;
  const { text } = message

  const name = `${firstName || ""} ${lastName || ""}`
  const taskLink = `https://my.eduhund.com/${taskId.substr(0, 3)}/${taskId.substr(3, 2)}/${taskId.substr(5)}`
	const informerMessage = `${name}: ${text}`;
	const userInfo = `${name} (${email}) спрашивает свой вопрос в задаче *${taskName}* [<${taskLink}|${taskId}>]`;

	return {
		channel: to.channelId,
		text: informerMessage,
		blocks: [
			{
				type: "context",
				elements: [
					{
						type: "mrkdwn",
						text: userInfo,
					},
				],
			},
			{
				type: "section",
				text: {
					type: "plain_text",
					text: text || " ",
					emoji: true,
				},
			},
		],
	};
}

module.exports = { taskComment };