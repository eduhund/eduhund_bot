const { THREADS } = require("../mongo");
const { checkQuery, getProjection } = require("../requiredParams");

function getThread({ query = {}, returns = [] }) {
	return (
		checkQuery("getThread", query) &&
		THREADS.findOne(query, {
			projection: getProjection(returns),
			sort: { $natural: -1 },
		})
	);
}

module.exports = getThread;
