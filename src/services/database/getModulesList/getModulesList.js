const { MODULES } = require("../mongo");
const { checkQuery, getProjection } = require("../requiredParams");

function getModulesList({ query = {}, returns = [] }) {
	return (
		checkQuery("getModulesList", query) &&
		MODULES.find(query, { projection: getProjection(returns) }).toArray()
	);
}

module.exports = getModulesList;
