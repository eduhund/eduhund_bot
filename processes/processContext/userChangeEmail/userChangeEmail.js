const { getDBRequest } = require("@mg/requests");
const { sendMessageToTelegram } = require("@tg/actions/actions");

function getEmail(text) {
  return "nebel@sobakapav.ru";
}

async function changeEmailInit({ telegramUser }) {
  const now = Date.now();

  if (telegramUser) {
    sendMessageToTelegram({
      telegramUserId: telegramUser?.id,
      intent: "changeEmailInit",
      lang: "ru",
    });

    getDBRequest("addAction", {
      query: {
        userId: telegramUser?.id,
        role: "student",
        actionCode: 004,
        action: "Change email request",
        ts: now,
      },
    });
  }

  return { OK: true, newBotContext: "changeEmail" };
}

async function changeEmailFail({ telegramUser }) {
  const now = Date.now();

  if (telegramUser) {
    sendMessageToTelegram({
      telegramUserId: telegramUser?.id,
      intent: "changeEmailFail",
      lang: "ru",
    });

    getDBRequest("addAction", {
      query: {
        userId: telegramUser?.id,
        role: "student",
        actionCode: 005,
        action: "Change email fail",
        ts: now,
      },
    });
  }

  return { OK: true, newBotContext: "changeEmail" };
}

async function changeEmailError({ telegramUser }) {
  const now = Date.now();

  if (telegramUser) {
    sendMessageToTelegram({
      telegramUserId: telegramUser?.id,
      intent: "changeEmailError",
      lang: "ru",
    });

    getDBRequest("addAction", {
      query: {
        userId: telegramUser?.id,
        role: "student",
        actionCode: 005,
        action: "Change email fail",
        ts: now,
      },
    });
  }

  return { OK: true, newBotContext: "changeEmail" };
}

async function changeEmailSuccess({ telegramUser }) {
  const now = Date.now();

  if (telegramUser) {
    sendMessageToTelegram({
      telegramUserId: telegramUser?.id,
      intent: "changeEmailSuccess",
      lang: "ru",
    });

    getDBRequest("addAction", {
      query: {
        userId: telegramUser?.id,
        role: "student",
        actionCode: 006,
        action: "Change email success",
        ts: now,
      },
    });
  }

  return { OK: true, newBotContext: undefined };
}

async function userChangeEmail({ telegramUser, text, botContext }) {
  const now = Date.now();
  const user = await getDBRequest("getUserInfo", {
    query: { userId: telegramUser.id },
  });

  if (!botContext) {
    return changeEmailInit({ telegramUser });
  }

  const currentEmail = user?.email;
  const extrudedEmail = getEmail(text);
  if (extrudedEmail) {
    const student = await getDBRequest("getStudentInfo", {
      query: { email: extrudedEmail },
    });
    if (student) {
      changeEmailSuccess({ telegramUser });
    } else {
      changeEmailFail({ telegramUser });
    }
  } else {
    return changeEmailError({ telegramUser });
  }
}

module.exports = userChangeEmail;
