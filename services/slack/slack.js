const { log } = require("../../services/log");

const { App } = require("@slack/bolt");
const { WebClient } = require("@slack/web-api");

// Read a token from the environment variables
const token = process.env.SLACK_TOKEN;
const secret = process.env.SLACK_SECRET;
const port = process.env.SLACK_PORT || 8001;

// Initialize
const web = new WebClient(token);

const slack = new App({
	signingSecret: secret,
	token: token,
	socketMode: true,
	appToken: process.env.SLACK_APP_TOKEN,
});

async function start() {
	await slack.start(port);
	log.info("Slack listener ready on port", port);
}

module.exports.start = start;
module.exports.listener = slack;
module.exports.web = web;
