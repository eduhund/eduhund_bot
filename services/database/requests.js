const { getUserInfo } = require("./getUserInfo/getUserInfo");
const { updateUserInfo } = require("./updateUserInfo/updateUserInfo");
const { getStudentInfo } = require("./getStudentInfo/getStudentInfo");
const { createThread } = require("./createThread/createThread");
const { getThread } = require("./getThread/getThread");
const { updateThread } = require("./updateThread/updateThread");
const { addToHistory } = require("./addToHistory/addToHistory");
const { addUser } = require("./addUser/addUser");
const { addAction } = require("./addAction/addAction");

const REQUESTS = {
  getUserInfo,
  getStudentInfo,
  createThread,
  getThread,
  updateThread,
  updateUserInfo,
  addToHistory,
  addUser,
  addAction,
};

function getDBRequest(type, params) {
  return REQUESTS[type](params);
}

module.exports.getDBRequest = getDBRequest;
