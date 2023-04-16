const { ACTIONS } = require("../mongo");
const { checkQuery } = require("../requiredParams");

function addAction({ query = {} }) {
	return checkQuery("addAction", query) && ACTIONS.insertOne(query);
}

module.exports = addAction;
