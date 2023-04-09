const { MODULES } = require("../mongo");
const { checkQuery, getProjection } = require("../requiredParams");

function getModulesList({ query = {}, returns = [] }) {
	const projection = getProjection(returns);
	return (
		checkQuery("getModulesList", query) &&
		MODULES.find(query, { projection }).toArray()
	);
}

module.exports = getModulesList;
