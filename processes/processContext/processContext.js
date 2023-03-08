const forwardMessageToSlack = require("./forwardMessageToSlack/forwardMessageToSlack");

function processContext(context, { userId, message, att, ts }) {
  switch (context) {
    case "tManual":
      return forwardMessageToSlack({ userId, message, att, ts });
  }
}

module.exports = processContext;
