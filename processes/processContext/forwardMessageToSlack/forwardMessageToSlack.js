const { getDBRequest } = require("@mg/requests");
const { sendMessageToSlack } = require("@sl/actions/actions");
const { sendMessageToTelegram } = require("@tg/actions/actions");

async function forwardMessageToSlack({ telegramUserId, text, att, ts }) {
  const now = Date.now();
  const user = await getDBRequest("getUserInfo", {
    query: { userId: telegramUserId },
  });
  const thread = await getDBRequest("getThread", {
    query: { telegramUserId: user?.userId, active: true },
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

  const responseTs = await sendMessageToSlack({ user, text, threadTs, att });

  if (!threadTs) {
    const query = {
      telegramUserId: user.userId,
      type: "student",
      thread: responseTs,
      text,
      active: true,
      lastMessage: Date.now(),
    };
    getDBRequest("createThread", {
      query,
    });
    sendMessageToTelegram({ telegramUserId, intent: "newThread", lang: "ru" });
  }

  return true;
}

module.exports = forwardMessageToSlack;
