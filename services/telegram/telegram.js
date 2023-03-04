require("dotenv").config();
const Telegraf = require("telegraf").Telegraf;
const message = require("telegraf/filters").message;

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.on(message("text"), async (ctx) => {
  await ctx.telegram.sendMessage(
    ctx.message.chat.id,
    `Hello ${ctx.state.role}`
  );
});

bot.launch();

console.log("hey");

module.exports.bot = bot;
