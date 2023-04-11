function getTelegramContext(message, botContext) {
	const text = (message || "").toLowerCase();
	if (botContext) {
		switch (botContext) {
			case "changeEmail":
				return "tChangeEmail";
			default:
				return "tManual";
		}
	}
	if (text === "• погладить котика •" || text === "• meow •") {
		return "tMeow";
	}
	if (
		text === "• узнать про другие задачники •" ||
		text === "• other taskbooks •"
	) {
		return "tOtherModules";
	}
	if (text === "• сменить email •") {
		return "tChangeMailInit";
	}
	if (text === "• забрать сертификат •" || text === "• get my diploma •") {
		return "tGetDiploma";
	}
	if (text.includes("задачник по логике")) {
		return "tGetLogicModule";
	}
	return "tManual";
}

function getSlackContext(message) {
	if (
		(message?.subtype === undefined || message?.subtype === "file_share") &&
		!message?.text.includes("<@U") &&
		message?.thread_ts
	) {
		return "sAnswer";
	}
	return undefined;
}

module.exports = { getTelegramContext, getSlackContext };
