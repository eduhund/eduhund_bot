const { THREADS } = require("../mongo");
const { getProjection } = require("../requiredParams");

function updateThread({ query = {}, data = {}, returns = [] }) {
	const toUpdate = {
		$set: data,
	};
	if (data.newMessage) {
		toUpdate.$push = {
			talk: data.newMessage,
		};
		delete data.newMessage;
	}
	return THREADS.findOneAndUpdate(query, toUpdate, {
		projection: getProjection(returns),
	});
}

module.exports = updateThread;
