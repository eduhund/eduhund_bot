const { broadcastModal } = require("./broadcastModal/broadcastModal");
const { broadcastSubmit } = require("./broadcastSubmit/broadcastSubmit");
const { dmModal } = require("./dmModal/dmModal");
const { dmSubmit } = require("./dmSubmit/dmSubmit");

function processModals(context, data) {
	switch (context) {
		case "sBroadcastModal":
			return broadcastModal(data);
		case "sBroadcastSubmit":
			return broadcastSubmit(data);
		case "sDmModal":
			return dmModal(data);
		case "sDmSubmit":
			return dmSubmit(data);
	}
}

module.exports = processModals;
