const { log } = require("../../services/log/log");
const { filesPrepare } = require("@utils/filesPrepare");

async function incomingData(data) {
	try {
		return {
			from: {
				userId: data?.user?.id || data?.user || data?.message?.user,
				username: data?.user?.username,
			},
			message: {
				channelId: data?.channel?.id || data.channel,
				threadId: data?.message?.thread_ts || data?.thread_ts,
				messageId: data?.message?.ts || data?.ts,
				date: data?.message?.ts || data?.ts,
				editDate: data?.ts,
				text:
					data?.message?.text ||
					data?.text ||
					data?.view?.state?.values?.message?.text?.value ||
					" ",
				att: await filesPrepare(data?.files),
			},
			data: {
				triggerId: data?.trigger_id,
				modulesList:
					data?.view?.state?.values?.modules?.modulesList?.selected_options,
				usersList:
					data?.view?.state?.values?.users?.usersList?.selected_options,
			},
		};
	} catch (e) {
		log.warn("Error with incoming slack data.\n", e);
		return {};
	}
}

module.exports = { incomingData };
