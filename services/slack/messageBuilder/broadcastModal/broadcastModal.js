function broadcastModal({ trigger, modules }) {
	const options = [];
	for (const module of modules) {
		options.push({
			text: {
				type: "plain_text",
				text: module.name,
				emoji: true,
			},
			value: module.code,
		});
	}

	const modal = {
		type: "modal",
		callback_id: "broadcastSubmit",
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
			text: "Broadcast to...",
			emoji: true,
		},
		blocks: [
			{
				type: "section",
				text: {
					type: "plain_text",
					text: "This action can send message to some group of users (or all of them).",
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
					options,
					action_id: "modulesList",
				},
				block_id: "modules",
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
		trigger_id: trigger,
		view: { ...modal },
	};

	return message;
}

module.exports = { broadcastModal };
