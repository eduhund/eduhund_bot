const { web } = require("./slack");

const channel = process.env.SLACK_CHANNEL;

web.chat.postMessage({
  channel,
  text: "Hello world!",
});
