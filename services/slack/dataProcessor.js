function incomingData({ payload, view, body }) {
	try {
		return {
			sUserId: payload?.message?.user || payload?.user,
			sUsername: payload?.user?.username,
			sMessageId: payload?.message?.ts || payload?.ts,
			sThreadId: payload?.message?.thread_ts || payload?.thread_ts,
			sMessageDate: payload?.message?.ts || payload?.ts,
			sMessageEditDate: payload?.ts,
			sMessage: payload?.message?.text || payload?.text,
			sChannelId: payload?.channel?.id || payload.channel,
			sTriggerId: payload?.trigger_id,
		};
	} catch {
		return {};
	}
}

module.exports = { incomingData };
