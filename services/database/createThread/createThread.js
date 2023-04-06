const { THREADS } = require("../mongo");

function createThread({ query = {}, returns = [] }) {
	const projection = {
		_id: 0,
	};
	for (const param of returns) {
		projection[param] = 1;
	}
	return THREADS.insertOne(query, { projection });
}

module.exports = { createThread };
