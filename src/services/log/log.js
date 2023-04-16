const log4js = require("log4js");

log4js.configure({
	appenders: {
		out: { type: "stdout" },
		file: { type: "file", filename: "./logs/eduhund-bot.log" },
		slack: {
			type: "@log4js-node/slack",
			token: process.env.SLACK_BOT_TOKEN,
			channel_id: process.env.SLACK_CHANNEL_ID,
			username: "Bot error handler",
		},
	},
	categories: {
		default: { appenders: ["out"], level: "debug" },
		e: { appenders: ["out", "slack"], level: "warn" },
		"e.test": { appenders: ["file"], level: "debug" },
		"e.prod": { appenders: ["file"], level: "debug" },
	},
});

const log = log4js.getLogger(
	process.env.MACHINE === "local" ? "default" : "e." + process.env.MACHINE
);

module.exports = { log };
