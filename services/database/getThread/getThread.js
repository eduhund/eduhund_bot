const { THREADS } = require("../mongo");

function getThread({ query = {}, returns = [] }) {
	const projection = {
		_id: 0,
	};
	for (const param of returns) {
		projection[param] = 1;
	}
	return THREADS.findOne(query, { projection });
}

module.exports = { getThread };
