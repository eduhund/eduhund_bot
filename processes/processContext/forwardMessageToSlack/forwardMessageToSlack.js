const { getDBRequest } = require("../../../services/database/requests");

async function forwardMessageToSlack({ userId, message, att, ts }) {
  const user = await getDBRequest("getUserInfo", { query: { userId } });
  const email = user.email;
  const now = Date.now();
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

  return { user, message, att };
}

module.exports = forwardMessageToSlack;
