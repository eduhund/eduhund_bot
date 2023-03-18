const { listener } = require("./slack");
const { echo } = require("../telegram/actions/actions");
const processContext = require("../../processes/processContext/processContext");

function getContext(message) {
  if (
    (message.subtype === undefined || message.subtype === "file_share") &&
    !message.text.includes("<@U") &&
    message.thread_ts
  ) {
    return "sAnswer";
  }
  return undefined;
}

function slackListenerRun() {
  listener.message(async ({ message }) => {
    const text = message.text;
    const threadTs = message.thread_ts;
    const slackUserId = message.user;
    const context = getContext(message);
    processContext(context, { slackUserId, text, threadTs });
  });
}

module.exports.slackListenerRun = slackListenerRun;
