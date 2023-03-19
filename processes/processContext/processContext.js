const forwardMessageToSlack = require("./forwardMessageToSlack/forwardMessageToSlack");
const answerToStudent = require("./answerToStudent/answerToStudent");

function processContext(
  context,
  { telegramUserId, text, att, slackUserId, threadTs }
) {
  switch (context) {
    case "tManual":
      return forwardMessageToSlack({ telegramUserId, text, att });
    case "sAnswer":
      return answerToStudent({
        telegramUserId,
        slackUserId,
        text,
        att,
        threadTs,
      });
  }
}

module.exports = processContext;
