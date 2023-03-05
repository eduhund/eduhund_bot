const { bot } = require("./telegram");
const message = require("telegraf/filters").message;
const { echo } = require("../slack/actions");

function getContext(message) {
  const msg = String.prototype.toLowerCase(message);
  if (msg === "• погладить котика •") {
    return "meow";
  }
  if (msg === "• узнать про другие задачники •") {
    return "getInfoAboutModules";
  }
  if (msg === "• сменить email •") {
    return "changeMail";
  }
  if (msg === "• забрать сертификат •") {
    return "getDiploma";
  }
  if (msg.includes("задачник по логике")) {
    return "getLogicModule";
  }
  return "manual";
}

function telegramListenerRun() {
  bot.on("message", async (ctx) => {
    const message = ctx.message.text;
    const userId = ctx.message.from.id;
    const ts = ctx.message.date;
    const context = getContext(message);
    const data = await processContext({ message, userId, ts, context });
    const answer = processAnswer(data);
    sendAnswer(userId, answer);
  });
  bot.on("photo", async (ctx) => echo(ctx.message.text));
  bot.on("document", async (ctx) => echo(ctx.message.text));

  //Not supported yet
  bot.on("edited_message", async (ctx) => {});
  bot.on("video", async (ctx) => {});
  bot.on("audio", async (ctx) => {});
}

module.exports.telegramListenerRun = telegramListenerRun;
