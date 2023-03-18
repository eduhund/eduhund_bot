const { getUserInfo } = require("./getUserInfo/getUserInfo");
const { getStudentInfo } = require("./getStudentInfo/getStudentInfo");
const { createThread } = require("./createThread/createThread");
const { getThread } = require("./getThread/getThread");

const REQUESTS = {
  getUserInfo,
  getStudentInfo,
  createThread,
  getThread,
};

function getDBRequest(type, params) {
  return REQUESTS[type](params);
}

module.exports.getDBRequest = getDBRequest;
