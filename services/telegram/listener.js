const { bot } = require("./telegram");
const processContext = require("../../processes/processContext/processContext");
const { sendMessageToSlack } = require("../slack/actions/actions");

function getContext(message) {
  const msg = String.prototype.toLowerCase(message);
  if (msg === "• погладить котика •") {
    return "tMeow";
  }
  if (msg === "• узнать про другие задачники •") {
    return "tGetInfoAboutModules";
  }
  if (msg === "• сменить email •") {
    return "tChangeMail";
  }
  if (msg === "• забрать сертификат •") {
    return "tGetDiploma";
  }
  if (msg.includes("задачник по логике")) {
    return "tGetLogicModule";
  }
  return "tManual";
}

function telegramListenerRun() {
  bot.on("message", async (ctx) => {
    const message = ctx.message.text;
    const userId = ctx.message.from.id;
    const ts = ctx.message.date;
    const context = getContext(message);
    const data = await processContext({ message, userId, ts, context });
    sendMessageToSlack(data);
    if (data.type === "mainMessage") {
      const answer = processAnswer(data);
      ctx.sendMessage(userId, answer);
    }
  });
  bot.on("photo", async (ctx) => echo(ctx.message.text));
  bot.on("document", async (ctx) => echo(ctx.message.text));

  //Not supported yet
  bot.on("edited_message", async (ctx) => {});
  bot.on("video", async (ctx) => {});
  bot.on("audio", async (ctx) => {});
}

module.exports.telegramListenerRun = telegramListenerRun;
