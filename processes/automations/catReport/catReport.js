const { log } = require("../../../services/log/log");
const getDBRequest = require("../../../services/database/requests");
const {
	sendMessageToSlack,
} = require("../../../services/slack/actions/actions");

const CHANNEL_ID = process.env.SLACK_CHANNEL;

function getDateRange() {
	const until = Date.now();
	const start = until - 1000 * 60 * 60 * 24;
	return { start, until };
}

async function catReport() {
	try {
		const { start, until } = getDateRange;
		const actions = await getDBRequest("getActions", {
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

		await sendMessageToSlack({ to, message, data });
		return { OK: true };
	} catch (e) {
		log.warn("Error with cat reporting: ", e);
		return { OK: false };
	}
}

module.exports = catReport;
