const { log } = require("../../../services/log/log");
const getDBRequest = require("@mg/requests");
const getActionQuery = require("../../../utils/actionsQueries");
const { sendMessageToSlack, addSlackReaction } = require("@sl/actions/actions");

const CHANNEL_ID = process.env.SLACK_CHANNEL;

async function closeThread({ from, message }) {
	try {
		if (!message.threadId) {
			message.threadId = message.date;
		}
		const { channelId, threadId } = message;

		if (channelId !== CHANNEL_ID) {
			return undefined;
		}

		const query = { threadId, active: true };
		const data = { active: false };
		const newThreadStatus = await getDBRequest("updateThread", {
			query,
			data,
		});

		if (!newThreadStatus?.value) {
			return undefined;
		}

		message.type = "closeThreadManual";

		sendMessageToSlack({
			from,
			message,
		});

		addSlackReaction({
			type: "closeThread",
			channelId,
			threadId,
		});

		getDBRequest("addAction", getActionQuery(12, "teacher", from.userId));
		return { OK: true, newBotContext: undefined };
	} catch (e) {
		log.warn("Error with closing thread.\n", e);
		return { OK: false, newBotContext: undefined };
	}
}

module.exports = { closeThread };
