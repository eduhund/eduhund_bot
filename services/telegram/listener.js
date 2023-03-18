const { bot } = require("./telegram");
const processContext = require("@processes/processContext/processContext");
const { getTelegramFileUrl } = require("@utils/getFileUrl");

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
    const text = ctx.message.text || ctx.message.caption;
    const telegramUserId = ctx.message.from.id;
    const ts = ctx.message.date;
    const image = ctx.message.photo || ctx.message.sticker;
    const document = ctx.message.document;
    const video = ctx.message.video || ctx.message.video_note;
    const audio = ctx.message.audio || ctx.message.voice;
    const imageUrl = image ? await getTelegramFileUrl(image) : undefined;
    const docUrl = document ? await getTelegramFileUrl(document) : undefined;
    const videoUrl = video ? await getTelegramFileUrl(video) : undefined;
    const audioUrl = audio ? await getTelegramFileUrl(audio) : undefined;
    const att = {
      image: imageUrl,
      document: docUrl || videoUrl || audioUrl,
    };
    const context = getContext(text);
    processContext(context, { telegramUserId, text, att, ts });
  });

  //Not supported yet
  bot.on("edited_message", async (ctx) => {});
  bot.on("video", async (ctx) => {});
  bot.on("audio", async (ctx) => {});
}

module.exports.telegramListenerRun = telegramListenerRun;
