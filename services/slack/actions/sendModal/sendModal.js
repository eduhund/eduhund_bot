const { dmModal } = require("@sl/messageBuilder/messageBuilder");

const { web } = require("@sl/slack");

async function sendModal({ trigger, type, data }) {
	switch (type) {
		case "broadcast":
			await web.views.open(broadcastModal({ trigger, modules: data?.modules }));
			break;
		case "dm":
			await web.views.open(dmModal({ trigger, users: data?.users }));
			break;
	}
}

module.exports = { sendModal };
