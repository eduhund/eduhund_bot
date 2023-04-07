function sliceIntoChunks(arr, chunkSize) {
	const res = [];
	for (let i = 0; i < arr.length; i += chunkSize) {
		const chunk = arr.slice(i, i + chunkSize);
		res.push(chunk);
	}
	return res;
}

function dmModal({ triggerId, users }) {
	const options = [];
	for (const user of users) {
		if (user.email && user.userId) {
			options.push({
				text: {
					type: "plain_text",
					text: user.email,
					emoji: true,
				},
				value: user.userId.toString(),
			});
		}
	}

	const groups = sliceIntoChunks(options, 100);

	const optionGroups = groups.map((group, i) => {
		return {
			label: {
				type: "plain_text",
				text: `Part ${i + 1}`,
			},
			options: group,
		};
	});

	const modal = {
		type: "modal",
		callback_id: "newDmSubmit",
		submit: {
			type: "plain_text",
			text: "Send",
			emoji: true,
		},
		close: {
			type: "plain_text",
			text: "Cancel",
			emoji: true,
		},
		title: {
			type: "plain_text",
			text: "Send direct message",
			emoji: true,
		},
		blocks: [
			{
				type: "section",
				text: {
					type: "plain_text",
					text: "You can send private message to one (or more) authorized users",
					emoji: true,
				},
			},
			{
				type: "divider",
			},
			{
				type: "input",
				label: {
					type: "plain_text",
					text: "Who needs to know?",
					emoji: true,
				},
				element: {
					type: "multi_static_select",
					placeholder: {
						type: "plain_text",
						text: "Select one or more",
						emoji: true,
					},
					option_groups: optionGroups,
					action_id: "usersList",
				},
				block_id: "users",
			},
			{
				type: "input",
				label: {
					type: "plain_text",
					text: "Your message",
					emoji: true,
				},
				element: {
					type: "plain_text_input",
					multiline: true,
					action_id: "text",
				},
				block_id: "message",
			},
		],
	};

	const message = {
		trigger_id: triggerId,
		view: { ...modal },
	};

	return message;
}

module.exports = { dmModal };
