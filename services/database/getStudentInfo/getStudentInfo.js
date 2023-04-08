const { STUDENTS } = require("../mongo");

async function getStudentInfo({ query, returns = [] }) {
	if (!query || Object.keys(query).length === 0) return undefined;
	const projection = {
		_id: 0,
	};
	for (const param of returns) {
		projection[param] = 1;
	}
	const response = await STUDENTS.findOne(query, { projection });
	return response || undefined;
}

module.exports = { getStudentInfo };
