const { web } = require("@sl/slack");

function reactionContext(type) {
	switch (type) {
		case "closeThread":
			return "o";
	}
}

function addSlackReaction({ type, channelId, threadId }) {
	web.reactions.add({
		channel: channelId,
		name: reactionContext(type),
		timestamp: threadId,
	});
}

module.exports = { addSlackReaction };
