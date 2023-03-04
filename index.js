require("dotenv").config();
const bot = require("./services/telegram/telegram");
const slack = require("./services/slack/slack");
const server = require("./services/express/express");

bot.start();
slack.start();
server.start();
