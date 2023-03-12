const { getUserInfo } = require("./getUserInfo/getUserInfo");
const { getStudentInfo } = require("./getStudentInfo/getStudentInfo");
const { addThread } = require("./addThread/addThread");
const { getThread } = require("./getThread/getThread");

const REQUESTS = {
  getUserInfo,
  getStudentInfo,
  addThread,
  getThread,
};

function getDBRequest(type, params) {
  return REQUESTS[type](params);
}

module.exports.getDBRequest = getDBRequest;
