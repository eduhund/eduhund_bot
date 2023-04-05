const { broadcastModal } = require("./broadcastModal/broadcastModal");
const { broadcastSubmit } = require("./broadcastSubmit/broadcastSubmit");
const { dmModal } = require("./dmModal/dmModal");

function processModals(context, data) {
	switch (context) {
		case "sBroadcastModal":
			return broadcastModal(data);
		case "sBroadcastSubmit":
			return broadcastSubmit(data);
		case "sDmModal":
			return dmModal(data);
	}
}

module.exports = processModals;
