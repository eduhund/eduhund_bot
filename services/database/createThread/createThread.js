const { THREADS } = require("../mongo");
const { checkQuery } = require("../requiredParams");

function createThread({ query = {} }) {
	return (
		checkQuery("addUser", query) && THREADS.insertOne(query, { projection })
	);
}

module.exports = createThread;
