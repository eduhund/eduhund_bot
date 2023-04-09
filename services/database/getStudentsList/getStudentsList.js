const { STUDENTS } = require("../mongo");
const { checkQuery, getProjection } = require("../requiredParams");

function getStudentsList({ query = {}, returns = [] }) {
	return (
		checkQuery("getStudentsList", query) &&
		STUDENTS.find(query, { projection: getProjection(returns) }).toArray()
	);
}

module.exports = getStudentsList;
