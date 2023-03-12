const { getDBRequest } = require("../../../services/database/requests");

async function forwardMessageToSlack({ userId, message, att, ts }) {
  const now = Date.now();
  const user = await getDBRequest("getUserInfo", { query: { userId } });
  const thread = await getDBRequest("getThread", {
    query: { telegramId: user?.userId, active: true },
  });
  threadTs = thread?.thread;
  const email = user.email;
  var activeModules = [];
  if (email) {
    const userModules = await getDBRequest("getStudentInfo", {
      query: { email },
      returns: ["modules"],
    });
    for (const [id, data] of Object.entries(userModules?.modules || {})) {
      const deadline = Date.parse(data.deadline);
      if (deadline > now) {
        activeModules.push(id);
      }
    }
    user.modules = activeModules;
  }

  return { user, message, threadTs, att };
}

module.exports = forwardMessageToSlack;
