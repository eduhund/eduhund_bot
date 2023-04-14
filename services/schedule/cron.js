const { log } = require("../../services/log/log");
const cron = require("node-cron");
const { catReport } = require("../../processes/automations/automations");

function init() {
	cron.schedule("0 0 11 * * 1-5", catReport);
	log.info("Schedule initialized successful");
}

module.exports = { init };
