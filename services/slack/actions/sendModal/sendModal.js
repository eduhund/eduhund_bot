const { dmModal } = require("@sl/messageBuilder/messageBuilder");

const { web } = require("@sl/slack");

async function sendModal({ sTriggerId, type, data }) {
	switch (type) {
		case "broadcast":
			await web.views.open(
				broadcastModal({ sTriggerId, modules: data?.modules })
			);
			break;
		case "dm":
			await web.views.open(dmModal({ sTriggerId, users: data?.users }));
			break;
	}
}

module.exports = { sendModal };
