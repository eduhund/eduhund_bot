const { listener } = require("./slack");
const { processContext } = require("@processes/processContext/processContext");
const { filesPrepare } = require("@utils/filesPrepare");
const { processModals } = require("@processes/proccessModals/processModals");
const { processActions } = require("@processes/processActions/processActions");

function getContext(message) {
	if (
		(message.subtype === undefined || message.subtype === "file_share") &&
		!message.text.includes("<@U") &&
		message.thread_ts
	) {
		return "sAnswer";
	}
	return undefined;
}

function getActionContext({ type, reaction, item }) {
	if (type === "reaction_added" && reaction === "o") {
		return "sCloseThread";
	}
	return undefined;
}

function slackListenerRun() {
	listener.message(async ({ message }) => {
		const slackUserId = message?.user;
		const text = message?.text;
		const threadTs = message?.thread_ts;
		const att = await filesPrepare(message?.files);
		const context = getContext(message);
		processContext(context, { slackUserId, text, threadTs, att });
	});

	listener.command("/broadcast", async ({ payload, ack }) => {
		await processModals("sBroadcastModal", { trigger: payload.trigger_id });
		ack();
	});

	listener.command("/newdm", async ({ payload, ack }) => {
		await processModals("sDmModal", { trigger: payload.trigger_id });
		ack();
	});

	listener.view("broadcastSubmit", async ({ view, body, ack }) => {
		await processModals("sBroadcastSubmit", { view, user: body.user });
		ack();
	});

	listener.view("newDmSubmit", async ({ view, body, ack }) => {
		await processModals("sDmSubmit", { view, user: body.user });
		ack();
	});

	listener.event("reaction_added", async ({ event }) => {
		const userId = event.user;
		const channel = event.item.channel;
		const ts = event.item.ts;
		const actionContext = getActionContext(event);
		await processActions(actionContext, { userId, channel, ts });
	});
}

module.exports = { slackListenerRun };
