const { log } = require("../../services/log/log");
const { closeThread } = require("./closeThread/closeThread");
const { reopenThread } = require("./reopenThread/reopenThread");

function processActions(context, data) {
	try {
		switch (context) {
			case "sCloseThread":
				return closeThread(data);
			case "sReopenThread":
				return reopenThread(data);
		}
	} catch (e) {
		log.warn("Error in action process:", e);
		return;
	}
}

module.exports = { processActions };
