const forwardMessageToSlack = require("./forwardMessageToSlack/forwardMessageToSlack");
const answerToStudent = require("./answerToStudent/answerToStudent");

function processContext(
  context,
  { telegramUserId, text, att, ts, slackUserId, threadTs }
) {
  switch (context) {
    case "tManual":
      return forwardMessageToSlack({ telegramUserId, text, att, ts });
    case "sAnswer":
      return answerToStudent({
        telegramUserId,
        slackUserId,
        text,
        att,
        ts,
        threadTs,
      });
  }
}

module.exports = processContext;
