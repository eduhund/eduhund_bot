const forwardMessageToSlack = require("./forwardMessageToSlack/forwardMessageToSlack");

function processContext({ message, userId, ts, context }) {
  switch (context) {
    case "tManual":
      return forwardMessageToSlack({ message, userId, ts });
  }
}

module.exports = processContext;
