const { log } = require("../../services/log/log");
const { closeThread } = require("./closeThread/closeThread");

function processActions(context, data) {
	try {
		switch (context) {
			case "sCloseThread":
				return closeThread(data);
		}
	} catch (e) {
		log.warn("Error in modal process:", e);
		return;
	}
}

module.exports = { processActions };
