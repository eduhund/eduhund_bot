const { ACTIONS } = require("../mongo");
const { getProjection } = require("../requiredParams");

function getActions({ query = {}, returns = [] }) {
	return ACTIONS.find(query, { projection: getProjection(returns) }).toArray();
}

module.exports = getActions;
