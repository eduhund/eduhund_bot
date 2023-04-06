const { log } = require("../../services/log");

const { userStart } = require("./userStart/userStart");
const { userHelp } = require("./userHelp/userHelp");
const { userPet } = require("./userPet/userPet");
const { userSettings } = require("./userSettings/userSettings");
const { userChangeEmail } = require("./userChangeEmail/userChangeEmail");
const { userCancel } = require("./userCancel/userCancel");
const { userGetLogic } = require("./userGetLogic/userGetLogic");
const { otherModules } = require("./otherModules/otherModules");
const {
	forwardMessageToSlack,
} = require("./forwardMessageToSlack/forwardMessageToSlack");
const { answerToStudent } = require("./answerToStudent/answerToStudent");

function processContext(context, data) {
	try {
		switch (context) {
			case "tStart":
				return userStart(data);
			case "tHelp":
				return userHelp(data);
			case "tSettings":
				return userSettings(data);
			case "tChangeEmail":
			case "tChangeEmailButton":
				return userChangeEmail(data);
			case "tCancelButton":
				return userCancel(data);
			case "tOtherModules":
				return otherModules(data);
			case "tGetLogicModule":
				return userGetLogic(data);
			case "tMeow":
				return userPet(data);
			case "tManual":
				return forwardMessageToSlack(data);
			case "sAnswer":
				return answerToStudent(data);
		}
	} catch (e) {
		log.warn("Error in context process:", e);
		return;
	}
}

module.exports = { processContext };
