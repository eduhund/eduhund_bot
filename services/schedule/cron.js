const { log } = require("../../services/log/log");
const cron = require("node-cron");
const { catReport } = require("../../processes/automations/automations");

const reportCat = cron.schedule("* * 11 * * 1-5", catReport);
function init() {
	reportCat.start();
	log.info("Schedule initialized successful");
}

module.exports = { init, reportCat };
