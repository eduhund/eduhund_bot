require("dotenv").config();
require("module-alias/register");
const { log } = require("./services/log/log");

const bot = require("@tg/telegram");
const slack = require("@sl/slack");
const server = require("@ex/express");
const mongo = require("@mg/mongo");
const { slackListenerRun } = require("@sl/listener");
const { telegramListenerRun } = require("@tg/listener");

async function start() {
	try {
		await mongo.connect();
		await bot.start();
		await telegramListenerRun();
		await slack.start();
		await slackListenerRun();
		await server.start();
		log.info("All systems running. Let's rock!");
	} catch (e) {
		log.error("Hewston, we have a problem!\n", e);
		process.exit();
	}
}

start();
