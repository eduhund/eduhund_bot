const { web } = require("@sl/slack");

function reactionContext(type) {
	switch (type) {
		case "reopenThread":
			return "o";
	}
}

function removeSlackReaction({ rChannelId, type, threadId }) {
	web.reactions.remove({
		channel: rChannelId,
		name: reactionContext(type),
		timestamp: threadId,
	});
}

module.exports = { removeSlackReaction };
