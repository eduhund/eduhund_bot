const { log } = require("../../../../services/log/log");

const {
	broadcastModal,
	dmModal,
} = require("../../messageBuilder/messageBuilder");
const { web } = require("../../slack");

async function openModal(modalBuilder, modalData) {
	await web.views.open(modalBuilder(modalData));
	log.debug("Slack — Modal has been opened: ", modalData);
}

async function sendModal({ triggerId, type, data }) {
	switch (type) {
		case "broadcast":
			await openModal(broadcastModal, { triggerId, modules: data.modules });
			break;
		case "dm":
			await openModal(dmModal, { triggerId, users: data.users });
			break;
	}
}

module.exports = { sendModal };
