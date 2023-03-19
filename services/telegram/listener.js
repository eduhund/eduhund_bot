const { bot } = require("./telegram");
const processContext = require("@processes/processContext/processContext");
const { getTelegramFileUrl } = require("@utils/getFileUrl");

function getContext(message, botContext) {
  const msg = String.prototype.toLowerCase(message);
  if (botContext) {
    switch (botContext) {
      case "changeEmail":
        return "tChangeEmail";
    }
  }
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
  bot.command("start", async (ctx) => {
    const telegramUser = ctx.message.from;
    const context = "tStart";
    processContext(context, { telegramUser });
  });

  bot.command("help", async (ctx) => {
    const telegramUser = ctx.message.from;
    const context = "tHelp";
    processContext(context, { telegramUser });
  });

  bot.command("settings", async (ctx) => {
    const telegramUser = ctx.message.from;
    const context = "tSettings";
    processContext(context, { telegramUser });
  });

  bot.on("callback_query", async (ctx) => {
    const telegramUser = ctx.callbackQuery.from;
    const context = ctx.callbackQuery.data;
    const botContext = ctx.session;
    const response = await processContext(context, {
      telegramUser,
      botContext,
    });
    ctx.session = response?.newBotContext;
  });

  bot.on("message", async (ctx) => {
    const botContext = ctx.session;
    const text = ctx.message.text || ctx.message.caption;
    const telegramUser = ctx.message.from;
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
    const context = getContext(text, botContext);
    const response = await processContext(context, {
      telegramUser,
      text,
      att,
      botContext,
    });
    ctx.session = response?.newBotContext;
  });

  //Not supported yet
  bot.on("edited_message", async (ctx) => {});
  bot.on("video", async (ctx) => {});
  bot.on("audio", async (ctx) => {});
}

module.exports.telegramListenerRun = telegramListenerRun;
