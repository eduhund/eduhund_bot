const { log } = require("../../services/log");

const express = require("express");
const server = express();

const port = process.env.SERVER_PORT || 8000;

function start() {
	return new Promise((resolve, reject) => {
		server.listen(port, (err) => {
			if (err) {
				return reject(err);
			}
			log.info("Server starts on port", port);
			return resolve();
		});
	});
}

module.exports.start = start;
