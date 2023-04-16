const getDBRequest = require("@mg/requests");
const { sendModal } = require("../../../services/slack/actions/actions");

async function dmModal({ data: { triggerId } }) {
	const users = await getDBRequest("getUsersList", {
		query: { email: { $exists: true } },
	});
	return sendModal({ triggerId, type: "dm", data: { users } });
}

module.exports = { dmModal };
