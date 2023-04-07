const {
	broadcastModal,
	dmModal,
} = require("@sl/messageBuilder/messageBuilder");
const { web } = require("@sl/slack");

async function sendModal({ triggerId, type, data }) {
	switch (type) {
		case "broadcast":
			const { modules } = data;
			await web.views.open(broadcastModal({ triggerId, modules }));
			break;
		case "dm":
			const { users } = data;
			await web.views.open(dmModal({ triggerId, users }));
			break;
	}
}

module.exports = { sendModal };
