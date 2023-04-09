const { USERS } = require("../mongo");
const { checkQuery, getProjection } = require("../requiredParams");

async function getUserInfo({ query, returns = [] }) {
	return (
		checkQuery("getUserInfo", query) &&
		USERS.findOne(query, { projection: getProjection(returns) })
	);
}

module.exports = getUserInfo;
