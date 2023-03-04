const express = require("express");
const server = express();

const port = process.env.SERVER_PORT;

function start() {
  server.listen(port, () => console.log("Server starts on port", port));
}

module.exports.start = start;
