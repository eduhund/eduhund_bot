const { USERS } = require("../mongo");

function updateUserInfo({ query = {}, data = {}, returns = [] }) {
	const projection = {
		_id: 0,
	};

	for (const param of returns) {
		projection[param] = 1;
	}

	const toUpdate = {
		$set: data,
	};

	return USERS.findOneAndUpdate(query, toUpdate, { projection });
}

module.exports = { updateUserInfo };
