const { getDBRequest } = require("../../../services/database/requests");

async function forwardMessagetoSlack({ message, userId, ts }) {
  const user = await getDBRequest("getUserInfo", { query: { userId } });
  return { user, message };
}

module.exports = forwardMessagetoSlack;
