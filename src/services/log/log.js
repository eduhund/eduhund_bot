const log4js = require("log4js");

log4js.configure({
	appenders: {
		out: { type: "stdout" },
		outLevelFilter: {
			type: "logLevelFilter",
			level: "warn",
			appender: "out",
		},
		file: { type: "file", filename: "./logs/eduhund-bot.log" },
		slack: {
			type: "@log4js-node/slack",
			token: process.env.SLACK_BOT_TOKEN,
			channel_id: process.env.SLACK_CHANNEL_ID,
			username: "Bot error handler",
		},
		slackLevelFilter: {
			type: "logLevelFilter",
			level: "warn",
			appender: "slack",
		},
	},
	categories: {
		default: { appenders: ["out"], level: "debug" },
		test: {
			appenders: ["outLevelFilter", "file", "slackLevelFilter"],
			level: "debug",
		},
		prod: {
			appenders: ["outLevelFilter", "file", "slackLevelFilter"],
			level: "debug",
		},
	},
});

const log = log4js.getLogger(process.env.MACHINE);

module.exports = { log };
