const a = {
	type: "modal",
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
				options: [
					{
						text: {
							type: "plain_text",
							text: ":pizza: Pizza",
							emoji: true,
						},
						value: "value-0",
					},
					{
						text: {
							type: "plain_text",
							text: ":fried_shrimp: Thai food",
							emoji: true,
						},
						value: "value-1",
					},
					{
						text: {
							type: "plain_text",
							text: ":desert_island: Hawaiian",
							emoji: true,
						},
						value: "value-2",
					},
					{
						text: {
							type: "plain_text",
							text: ":meat_on_bone: Texas BBQ",
							emoji: true,
						},
						value: "value-3",
					},
					{
						text: {
							type: "plain_text",
							text: ":hamburger: Burger",
							emoji: true,
						},
						value: "value-4",
					},
					{
						text: {
							type: "plain_text",
							text: ":taco: Tacos",
							emoji: true,
						},
						value: "value-5",
					},
					{
						text: {
							type: "plain_text",
							text: ":green_salad: Salad",
							emoji: true,
						},
						value: "value-6",
					},
					{
						text: {
							type: "plain_text",
							text: ":stew: Indian",
							emoji: true,
						},
						value: "value-7",
					},
				],
			},
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
			},
		},
	],
};
