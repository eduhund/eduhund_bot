const bot = require("./services/telegram/telegram");
const server = require("./services/express/express");
const message = require("telegraf/filters").message;

const port = 7777;

//server.listen(port, () => console.log("Listening on port", port));
