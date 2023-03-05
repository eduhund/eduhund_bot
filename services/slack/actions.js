const { web } = require("./slack");

const channel = process.env.SLACK_CHANNEL;

async function echo(text) {
  await web.chat.postMessage({
    channel,
    text,
  });
}

module.exports.echo = echo;
