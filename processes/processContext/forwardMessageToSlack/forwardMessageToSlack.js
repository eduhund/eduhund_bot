const { getDBRequest } = require("@mg/requests");
const { sendMessageToSlack } = require("@sl/actions/actions");
const { sendMessageToTelegram } = require("@tg/actions/actions");

async function forwardMessageToSlack({ telegramUserId, text, att, ts }) {
  const now = Date.now();
  const user = await getDBRequest("getUserInfo", {
    query: { userId: telegramUserId },
  });
  const thread = await getDBRequest("getThread", {
    query: { userId: user?.userId, active: true },
  });
  const threadId = thread?.threadId;
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

  const responseTs = await sendMessageToSlack({ user, text, threadId, att });

  if (!threadId) {
    const query = {
      userId: user.userId,
      source: "telegram",
      dest: "slack",
      role: "student",
      ts,
      text,
      threadId: responseTs,
      active: true,
      talk: [],
      lastIncMessage: Date.now(),
    };
    getDBRequest("createThread", {
      query,
    });
    sendMessageToTelegram({ telegramUserId, intent: "newThread", lang: "ru" });
  } else {
    getDBRequest("updateThread", {
      query: { threadId: threadId, active: true },
      data: {
        lastOutMessage: now,
        newMessage: {
          userId: telegramUserId,
          source: "telegram",
          dest: "slack",
          role: "student",
          text,
          ts: now,
        },
      },
    });
  }

  return true;
}

module.exports = forwardMessageToSlack;
