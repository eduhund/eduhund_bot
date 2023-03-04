const { App } = require("@slack/bolt");

const port = process.env.SLACK_PORT;

const slack = new App({
  signingSecret: process.env.SLACK_SECRET,
  token: process.env.SLACK_TOKEN,
});

async function start() {
  await slack.start(port);
  console.log("Slack listener ready on port", port);
}

module.exports.start = start;
