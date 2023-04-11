const { log } = require("../../services/log/log");
const cron = require("node-cron");
const {
	catReport,
} = require("../../processes/automatizations/automatizations");

const catReport = cron.schedule("* * 11 * * 1-5", catReport);
function init() {
	catReport.start();
	log.info("Schedule initialized successful");
}

module.exports = { init, catReport };
