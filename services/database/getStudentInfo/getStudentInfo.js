const { STUDENTS } = require("../mongo");
const { checkQuery, getProjection } = require("../requiredParams");

async function getStudentInfo({ query, returns = [] }) {
	return (
		checkQuery("getStudentInfo", query) &&
		STUDENTS.findOne(query, { projection: getProjection(returns) })
	);
}

module.exports = getStudentInfo;
