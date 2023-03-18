const { listener } = require("./slack");
const processContext = require("../../processes/processContext/processContext");
const { filesPrepare } = require("../../utils/filesPrepare");

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
    const att = await filesPrepare(message.files);
    const context = getContext(message);
    processContext(context, { slackUserId, text, threadTs, att });
  });
}

module.exports.slackListenerRun = slackListenerRun;
