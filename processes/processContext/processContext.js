const userStart = require("./userStart/userStart");
const forwardMessageToSlack = require("./forwardMessageToSlack/forwardMessageToSlack");
const answerToStudent = require("./answerToStudent/answerToStudent");

function processContext(context, data) {
  switch (context) {
    case "tStart":
      return userStart(data);
    case "tManual":
      return forwardMessageToSlack(data);
    case "sAnswer":
      return answerToStudent(data);
  }
}

module.exports = processContext;
