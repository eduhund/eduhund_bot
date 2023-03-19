const userStart = require("./userStart/userStart");
const userHelp = require("./userHelp/userHelp");
const forwardMessageToSlack = require("./forwardMessageToSlack/forwardMessageToSlack");
const answerToStudent = require("./answerToStudent/answerToStudent");

function processContext(context, data) {
  switch (context) {
    case "tStart":
      return userStart(data);
    case "tHelp":
      return userHelp(data);
    case "tManual":
      return forwardMessageToSlack(data);
    case "sAnswer":
      return answerToStudent(data);
  }
}

module.exports = processContext;
