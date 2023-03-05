const { listener } = require("./slack");
const { echo } = require("../telegram/actions");

function slackListenerRun() {
  listener.message(async ({ message, say }) => {
    if (
      (message.subtype === undefined || message.subtype === "file_share") &&
      !message.text.includes("<@U")
    ) {
      await echo(message.text);
    }
  });
}

module.exports.slackListenerRun = slackListenerRun;
