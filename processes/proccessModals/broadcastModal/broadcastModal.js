const getDBRequest = require("@mg/requests");
const { sendModal } = require("../../../services/slack/actions/actions");

async function broadcastModal({ data }) {
	const { triggerId } = data;
	const modules = await getDBRequest("getModulesList", {});
	return sendModal({ triggerId, type: "broadcast", data: { modules } });
}

module.exports = { broadcastModal };
