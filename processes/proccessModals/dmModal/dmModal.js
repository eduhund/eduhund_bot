const { getDBRequest } = require("@mg/requests");
const { sendModal } = require("../../../services/slack/actions/actions");

async function dmModal({ trigger }) {
	const data = await getDBRequest("getUsersList", {
		query: { email: { $exists: true } },
	});
	return sendModal({ trigger, type: "dm", data: { users: data } });
}

module.exports = { dmModal };
