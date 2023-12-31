const { COMMENTS } = require("../mongo");
const { checkQuery, getProjection } = require("../requiredParams");

async function getTaskComment({ query, returns = [] }) {
	return COMMENTS.findOne(query, { projection: getProjection(returns) });
}

module.exports = getTaskComment;