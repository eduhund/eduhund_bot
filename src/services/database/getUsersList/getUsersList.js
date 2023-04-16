const { USERS } = require("../mongo");
const { checkQuery, getProjection } = require("../requiredParams");

function getUsersList({ query = {}, returns = [] }) {
	return (
		checkQuery("getUsersList", query) &&
		USERS.find(query, { projection: getProjection(returns) }).toArray()
	);
}

module.exports = getUsersList;
