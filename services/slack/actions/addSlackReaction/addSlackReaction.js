const { web } = require("@sl/slack");

function reactionContext(type) {
	switch (type) {
		case "closeThread":
			return "o";
	}
}

function addSlackReaction({ sChannelId, type, threadId }) {
	web.reactions.add({
		channel: sChannelId,
		name: reactionContext(type),
		timestamp: threadId,
	});
}

module.exports = { addSlackReaction };
