const { USERS } = require("../mongo");

async function getUserInfo({ query, returns = [] }) {
	if (!query || Object.keys(query).length === 0) return undefined;
	const projection = {
		_id: 0,
	};
	for (const param of returns) {
		projection[param] = 1;
	}
	const response = await USERS.findOne(query, { projection });
	return response || undefined;
}

module.exports = { getUserInfo };
