const { broadcastModal } = require("./broadcastModal/broadcastModal");
const { broadcastSubmit } = require("./broadcastSubmit/broadcastSubmit");

function processModals(context, data) {
	switch (context) {
		case "sBroadcastModal":
			return broadcastModal(data);
		case "sBroadcastSubmit":
			return broadcastSubmit(data);
	}
}

module.exports = processModals;
