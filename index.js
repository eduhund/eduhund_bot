const bot = require("./services/telegram/telegram");
const slack = require("./services/slack/slack");
const server = require("./services/express/express");
const { slackListenerRun } = require("./services/slack/listener");
const { telegramListenerRun } = require("./services/telegram/listener");

bot.start();
telegramListenerRun();
slack.start();
slackListenerRun();
server.start();
