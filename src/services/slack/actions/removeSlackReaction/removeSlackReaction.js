const { web } = require("../../slack");

function reactionContext(type) {
	switch (type) {
		case "reopenThread":
			return "o";
	}
}

function removeSlackReaction({ type, channelId, threadId }) {
	web.reactions.remove({
		channel: channelId,
		name: reactionContext(type),
		timestamp: threadId,
	});
}

module.exports = { removeSlackReaction };
