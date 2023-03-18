function threadMessage({ user, text, threadTs, att }) {
  const informerMessage = `${user?.firstName} ${user?.lastName}: ${text}`;
  const form = {
    channel: process.env.SLACK_CHANNEL,
    text: informerMessage,
    thread_ts: threadTs,
    blocks: [
      {
        type: "section",
        text: {
          type: "plain_text",
          text: text || " ",
          emoji: true,
        },
      },
    ],
  };

  if (att.image) {
    form.blocks.push({
      type: "image",
      image_url: att.image,
      alt_text: "An incredibly cute kitten.",
    });
  }

  if (att.document) {
    form.blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*<${att.document}|Посмотреть вложение>*`,
      },
    });
  }

  return form;
}

module.exports = threadMessage;
