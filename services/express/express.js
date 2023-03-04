const express = require("express");
const server = express();

const port = 7777;

server.listen(port, () => console.log("Listening on port", port));

module.exports.server = server;
