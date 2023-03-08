const { getUserInfo } = require("./getUserInfo/getUserInfo");
const { getStudentInfo } = require("./getStudentInfo/getStudentInfo");

const REQUESTS = {
  getUserInfo,
  getStudentInfo,
};

function getDBRequest(type, params) {
  return REQUESTS[type](params);
}

module.exports.getDBRequest = getDBRequest;
