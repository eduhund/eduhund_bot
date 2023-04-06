const { web } = require("@sl/slack");

function reactionContext(type) {
	switch (type) {
		case "reopenThread":
			return "o";
	}
}

function removeSlackReaction({ channelId, type, threadId }) {
	web.reactions.remove({
		channel: channelId,
		name: reactionContext(type),
		timestamp: threadId,
	});
}

module.exports = { removeSlackReaction };
