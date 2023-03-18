require("module-alias/register");

const bot = require("@tg/telegram");
const slack = require("@sl/slack");
const server = require("@ex/express");
const { slackListenerRun } = require("@sl/listener");
const { telegramListenerRun } = require("@tg/listener");

bot.start();
telegramListenerRun();
slack.start();
slackListenerRun();
server.start();
