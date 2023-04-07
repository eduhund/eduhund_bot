const { log } = require("../../services/log/log");
const { filesPrepare } = require("@utils/filesPrepare");

async function incomingData({ payload, view, body }) {
	try {
		return {
			from: {
				userId: payload?.message?.user || payload?.user,
				username: payload?.user?.username,
			},
			message: {
				schannelId: payload?.channel?.id || payload.channel,
				threadId: payload?.message?.thread_ts || payload?.thread_ts,
				messageId: payload?.message?.ts || payload?.ts,
				date: payload?.message?.ts || payload?.ts,
				editDate: payload?.ts,
				text: payload?.message?.text || payload?.text,
				att: await filesPrepare(payload?.files),
			},
			data: {
				triggerId: payload?.trigger_id,
			},
		};
	} catch (e) {
		log.warn("Error with incoming slack data.\n", e);
		return {};
	}
}

module.exports = { incomingData };
