const { THREADS } = require("../mongo");

function updateThread({ query = {}, data = {}, returns = [] }) {
	const projection = {
		_id: 0,
	};

	for (const param of returns) {
		projection[param] = 1;
	}

	const toUpdate = {
		$set: data,
	};
	if (data.newMessage) {
		toUpdate.$push = {
			talk: data.newMessage,
		};
		delete data.newMessage;
	}
	return THREADS.findOneAndUpdate(query, toUpdate, { projection });
}

module.exports = updateThread;
