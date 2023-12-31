const getUserInfo = require("./getUserInfo/getUserInfo");
const updateUserInfo = require("./updateUserInfo/updateUserInfo");
const getStudentInfo = require("./getStudentInfo/getStudentInfo");
const createThread = require("./createThread/createThread");
const getThread = require("./getThread/getThread");
const updateThread = require("./updateThread/updateThread");
const addToHistory = require("./addToHistory/addToHistory");
const addUser = require("./addUser/addUser");
const addAction = require("./addAction/addAction");
const getModulesList = require("./getModulesList/getModulesList");
const getStudentsList = require("./getStudentsList/getStudentsList");
const getUsersList = require("./getUsersList/getUsersList");
const getActions = require("./getActions/getActions");
const addTaskComment = require("./addTaskComment/addTaskComment");
const getTaskComment = require("./getTaskComment/getTaskComment");

const REQUESTS = {
	getUserInfo,
	updateUserInfo,
	getStudentInfo,
	createThread,
	getThread,
	updateThread,
	addToHistory,
	addUser,
	addAction,
	getModulesList,
	getStudentsList,
	getUsersList,
	getActions,
	addTaskComment,
	getTaskComment
};

function getDBRequest(type, params) {
	const request = REQUESTS[type];
	if (!request) {
		throw new Error(`Invalid request type: ${type}`);
	}
	return request(params);
}

module.exports = getDBRequest;
