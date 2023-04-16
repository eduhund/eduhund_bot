const { THREADS } = require("../mongo");
const { checkQuery } = require("../requiredParams");

function createThread({ query = {} }) {
	return checkQuery("createThread", query) && THREADS.insertOne(query);
}

module.exports = createThread;
