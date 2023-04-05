const { listener } = require("./slack");
const processContext = require("@processes/processContext/processContext");
const { filesPrepare } = require("@utils/filesPrepare");
const processModals = require("../../processes/proccessModals/processModals");

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

function slackListenerRun() {
	listener.message(async ({ message }) => {
		const text = message.text;
		const threadTs = message.thread_ts;
		const slackUserId = message.user;
		const att = await filesPrepare(message.files);
		const context = getContext(message);
		processContext(context, { slackUserId, text, threadTs, att });
	});

	listener.command("/broadcast", async ({ payload, ack }) => {
		await processModals("sBroadcastModal", { trigger: payload.trigger_id });
		ack();
	});

	listener.command("/new_dm", () => {
		console.log("Hi");
	});

	listener.view("broadcastSubmit", async ({ view, body, ack }) => {
		await processModals("sBroadcastSubmit", { view, user: body.user });
		ack();
	});
}

module.exports.slackListenerRun = slackListenerRun;
