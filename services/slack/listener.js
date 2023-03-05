const { listener } = require("./slack");

function slackListenerRun() {
  listener.message(async ({ message, say }) => {
    console.log(message);
    if (
      (message.subtype === undefined || message.subtype === "file_share") &&
      !message.text.includes("<@U")
    ) {
      await say(message.text);
    }
  });
}

module.exports.slackListenerRun = slackListenerRun;
