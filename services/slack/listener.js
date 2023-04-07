const { listener } = require("./slack");
const { processContext } = require("@processes/processContext/processContext");
const { processModals } = require("@processes/proccessModals/processModals");
const { processActions } = require("@processes/processActions/processActions");
const { getSlackContext } = require("../../utils/getContext");
const { incomingData } = require("./dataProcessor");

function slackListenerRun() {
	listener.message(async ({ payload }) => {
		const data = await incomingData(payload);
		const context = getSlackContext(payload);
		await processContext(context, data);
	});

	listener.command("/broadcast", async ({ payload, ack }) => {
		const data = await incomingData(payload);
		await processModals("sBroadcastModal", data);
		ack();
	});

	listener.command("/newdm", async ({ payload, ack }) => {
		const data = await incomingData(payload);
		await processModals("sDmModal", data);
		ack();
	});

	listener.shortcut("closeThread", async ({ payload, ack }) => {
		const data = await incomingData(payload);
		await processActions("sCloseThread", data);
		ack();
	});

	listener.view("broadcastSubmit", async ({ body, ack }) => {
		const data = await incomingData(body);
		await processModals("sBroadcastSubmit", data);
		ack();
	});

	listener.view("newDmSubmit", async ({ view, body, ack }) => {
		await processModals("sDmSubmit", { view, user: body.user });
		ack();
	});
}

module.exports = { slackListenerRun };
