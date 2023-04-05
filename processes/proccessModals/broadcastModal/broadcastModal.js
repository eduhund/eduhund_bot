const { getDBRequest } = require("@mg/requests");
const { sendModal } = require("../../../services/slack/actions/actions");

async function broadcastModal({ trigger }) {
	const data = await getDBRequest("getModulesList", {
		query: {},
	});
	return sendModal({ trigger, type: "broadcast", data: { modules: data } });
}

module.exports = { broadcastModal };
