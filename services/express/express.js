const express = require("express");
const server = express();

const port = process.env.SERVER_PORT;

function start() {
	return new Promise((resolve, reject) => {
		server.listen(port, (err) => {
			if (err) {
				return reject(err);
			}
			console.log("Server starts on port", port);
			return resolve();
		});
	});
}

module.exports.start = start;
