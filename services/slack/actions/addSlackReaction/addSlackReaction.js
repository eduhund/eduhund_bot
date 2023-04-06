const { web } = require("@sl/slack");

function reactionContext(type) {
	switch (type) {
		case "closeThread":
			return "o";
	}
}

function addSlackReaction({ channelId, type, threadId }) {
	web.reactions.add({
		channel: channelId,
		name: reactionContext(type),
		timestamp: threadId,
	});
}

module.exports = { addSlackReaction };
