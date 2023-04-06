const { USERS } = require("../mongo");

function addUser({ query = {}, returns = [] }) {
	const projection = {
		_id: 0,
	};
	for (const param of returns) {
		projection[param] = 1;
	}
	return USERS.insertOne(query, { projection });
}

module.exports = { addUser };
