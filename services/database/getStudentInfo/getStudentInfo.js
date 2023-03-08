const { STUDENTS } = require("../mongo");

function getStudentInfo({ query = {}, returns = [] }) {
  const projection = {
    _id: 0,
  };
  for (const param of returns) {
    projection[param] = 1;
  }
  return STUDENTS.findOne(query, { projection });
}

module.exports.getStudentInfo = getStudentInfo;
