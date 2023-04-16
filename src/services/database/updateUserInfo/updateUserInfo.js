const { USERS } = require("../mongo");
const { getProjection } = require("../requiredParams");

function updateUserInfo({ query = {}, data = {}, returns = [] }) {
	const toUpdate = {
		$set: data,
	};

	return USERS.findOneAndUpdate(query, toUpdate, {
		projection: getProjection(returns),
	});
}

module.exports = updateUserInfo;
