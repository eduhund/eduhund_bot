async function echo(ctx) {
  await ctx.telegram.sendMessage(
    ctx.message.chat.id,
    `Hello ${ctx.state.role}`
  );
}

module.exports.echo = echo;
