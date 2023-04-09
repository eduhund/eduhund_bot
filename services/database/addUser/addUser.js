const { USERS } = require("../mongo");
const { checkQuery } = require("../requiredParams");

function addUser({ query = {} }) {
	return checkQuery("addUser", query) && USERS.insertOne(query);
}

module.exports = addUser;
