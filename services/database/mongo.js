const { log } = require("../../services/log/log");

const { MongoClient } = require("mongodb");

const mongo = new MongoClient(process.env.MONGO_URL);

const USERS = mongo.db(process.env.BOT_DATABASE).collection("users");
const THREADS = mongo.db(process.env.BOT_DATABASE).collection("threads");
const HISTORY = mongo.db(process.env.BOT_DATABASE).collection("history");
const ACTIONS = mongo.db(process.env.BOT_DATABASE).collection("actions");

const STUDENTS = mongo.db(process.env.PLATFORM_DATABASE).collection("users");

const MODULES = mongo.db(process.env.PLATFORM_DATABASE).collection("modules");

async function connect() {
	await mongo.connect();
	log.info("Connected to mongoDB server");
}

module.exports = {
	connect,
	USERS,
	THREADS,
	HISTORY,
	ACTIONS,
	STUDENTS,
	MODULES,
};
