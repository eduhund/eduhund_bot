const { getDBRequest } = require("@mg/requests");
const { sendModal } = require("../../../services/slack/actions/actions");

async function dmModal({ sTriggerId }) {
	const data = await getDBRequest("getUsersList", {
		query: { email: { $exists: true } },
	});
	return sendModal({ sTriggerId, type: "dm", data: { users: data } });
}

module.exports = { dmModal };
