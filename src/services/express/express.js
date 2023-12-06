const { log } = require("../../services/log/log");
const express = require("express");
const { sendMessageToSlack } = require("@sl/actions/actions");

// Read a server port from the environment variables
const { SERVER_PORT = 8000, ADMIN_TOKEN, SLACK_CHANNEL} = process.env;

// Initialize
const server = express();

function checkAccess(req, res, next) {
	const { authorization } = req.headers

	if ( authorization === ADMIN_TOKEN ) {
		next()
	} else {
		res.sendStatus(401)
	}
}

async function sendMessage(req, res) {
	try {
		const {type, data, text} = req.body

		switch (type) {
			case "taskComment":
	
				await sendMessageToSlack({
					from: data,
					to: {
						channelId: SLACK_CHANNEL
					},
					message: {
						type,
						text
					},
				});
	
		}
		res.sendStatus(200)
	} catch (e) {
		log.error("Error in sendMessage webhook")
		log.debug(e)
		res.sendStatus(500)
	}
}

server.use(express.json());
server.use(require("body-parser").urlencoded({ extended: false }));
server.use(checkAccess)

server.post("/sendMessage", sendMessage)

// Start function
function start() {
	return new Promise((resolve, reject) => {
		server.listen(SERVER_PORT, (err) => {
			if (err) {
				return reject(err);
			}
			log.info("Server starts on port", SERVER_PORT);
			return resolve();
		});
	});
}

module.exports = { start };
