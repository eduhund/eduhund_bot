const { getUserInfo } = require("./getUserInfo/getUserInfo");

const REQUESTS = {
  getUserInfo,
};

function getDBRequest(type, params) {
  return REQUESTS[type](params);
}

module.exports.getDBRequest = getDBRequest;
