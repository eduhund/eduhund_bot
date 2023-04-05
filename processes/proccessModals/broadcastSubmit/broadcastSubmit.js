const { getDBRequest } = require("@mg/requests");
const { sendMessageToSlack } = require("@sl/actions/actions");

async function broadcastSubmit({ view, user }) {
	const modules = view.state.values.modules.modulesList.selected_options;
	const moduleIds = modules.map((moduleItem) => moduleItem.value);
	const text = view.state.values.message.text.value || "";
	const author = user.name;

	const users = [];

	for (const moduleId of moduleIds) {
		const query = { [`modules.${moduleId}`]: { $exists: true } };

		const data = await getDBRequest("getStudentsList", {
			query,
			returns: ["email"],
		});
		const emails = data.map((item) => item.email);
		users.push(...emails);
	}

	const finalList = [...new Set(users)];

	const counter = finalList.length;

	sendMessageToSlack({
		type: "broadcastSuccess",
		text,
		data: { counter, author },
	});

	/*
	return sendMessageToSlack({
		trigger,
		type: "broadcast",
		data: { modules: data },
	});
  */
}

module.exports = { broadcastSubmit };
