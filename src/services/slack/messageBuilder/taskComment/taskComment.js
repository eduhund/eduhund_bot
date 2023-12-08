function taskComment({ from, to, message }) {
	const { email, firstName, lastName, moduleName, taskId, taskName } = from;
  const { text } = message

  const name = `${firstName || ""} ${lastName || ""}`
	const moduleId = taskId.substr(0, 3)
  const taskLink = `https://test.eduhund.com/${moduleId}/${taskId.substr(3, 2)}/${taskId.substr(5)}`
	const informerMessage = `${name}: ${text}`;
	const userInfo = `${name} (${email}) спрашивает вопрос в задаче *${taskName}* модуля ${moduleName || moduleId} [<${taskLink}|${taskId}>]`;

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