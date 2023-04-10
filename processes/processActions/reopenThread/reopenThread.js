const { log } = require("../../../services/log/log");
const getDBRequest = require("@mg/requests");
const getActionQuery = require("../../../utils/actionsQueries");
const { removeSlackReaction } = require("@sl/actions/actions");

const CHANNEL_ID = process.env.SLACK_CHANNEL;

async function reopenThread({ from, message }) {
	try {
		const { channelId, threadId } = message;
		if (channelId !== CHANNEL_ID) {
			return undefined;
		}
		const newThreadStatus = await getDBRequest("updateThread", {
			query: { threadId, active: false },
			data: { active: true },
		});

		if (!newThreadStatus?.value) {
			return undefined;
		}

		removeSlackReaction({
			type: "reopenThread",
			channelId,
			threadId,
		});

		getDBRequest("addAction", getActionQuery(13, "teacher", from.userId));
		return { OK: true, newBotContext: undefined };
	} catch (e) {
		log.warn("Error with reopening thread.\n", e);
		return { OK: false, newBotContext: undefined };
	}
}

module.exports = { reopenThread };
