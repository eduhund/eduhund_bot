const { STUDENTS } = require("../mongo");

function getStudentsList({ query = {}, returns = [] }) {
	const projection = {
		_id: 0,
	};
	for (const param of returns) {
		projection[param] = 1;
	}
	return STUDENTS.find(query, { projection }).toArray();
}

module.exports = getStudentsList;
