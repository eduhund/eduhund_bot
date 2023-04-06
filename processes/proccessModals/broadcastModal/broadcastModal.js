const { getDBRequest } = require("@mg/requests");
const { sendModal } = require("../../../services/slack/actions/actions");

async function broadcastModal({ sTriggerId }) {
	const data = await getDBRequest("getModulesList", {
		query: {},
	});
	return sendModal({ sTriggerId, type: "broadcast", data: { modules: data } });
}

module.exports = { broadcastModal };
