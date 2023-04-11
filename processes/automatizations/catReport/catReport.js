const { log } = require("../../../services/log/log");
const getDBRequest = require("@mg/requests");
const { sendMessageToSlack } = require("@sl/actions/actions");

const CHANNEL_ID = process.env.SLACK_CHANNEL;

function getDateRange() {
	const until = Date.now();
	const start = until - 1000 * 60 * 60 * 24;
	return { start, until };
}

function catReport() {
	try {
		const { start, until } = getDateRange;
		const actions = getDBRequest("getActions", {
			query: {
				code: 8,
				ts: { $gt: start, $lt: until },
			},
		});
		const to = {
			channelId: CHANNEL_ID,
		};
		const message = { type: "catReport" };
		const data = { count: actions.length };

		sendMessageToSlack("catReport", { to, message, data });
	} catch {
		log.warn("Error with cat reporting");
	}
}

module.exports = catReport;
