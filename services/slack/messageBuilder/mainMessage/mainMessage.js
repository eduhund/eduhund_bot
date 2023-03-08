function mainMessage({ user, message, att }) {
  const informerMessage = `${user?.firstName} ${user?.lastName}: ${message}`;
  var userInfo = `*<https://t.me/${user?.username}|${user?.firstName} ${user?.lastName}>*`;
  if (user?.email) {
    userInfo += ` / ${user?.email}`;
  }
  if (user?.modules) {
    userInfo += ` / ${user.modules.join(", ")}`;
  }
  const form = {
    channel: process.env.SLACK_CHANNEL,
    text: informerMessage,
    blocks: [
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: userInfo,
          },
        ],
      },
      {
        type: "section",
        text: {
          type: "plain_text",
          text: message || " ",
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
  return form;
}

module.exports = mainMessage;
