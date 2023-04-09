const { log } = require("../../services/log/log");
const { MongoClient } = require("mongodb");

const mongoURI = process.env.MONGO_URL;
const platformDatabase = process.env.PLATFORM_DATABASE;
const botDatabase = process.env.BOT_DATABASE;

const client = new MongoClient(mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const botDB = client.db(botDatabase);
const USERS = botDB.collection("users");
const THREADS = botDB.collection("threads");
const HISTORY = botDB.collection("history");
const ACTIONS = botDB.collection("actions");

const platformDB = client.db(platformDatabase);
const STUDENTS = platformDB.collection("users");
const MODULES = platformDB.collection("modules");

async function connect() {
	try {
		await client.connect();
		log.info("Connected to mongoDB server");
	} catch (error) {
		log.error("Failed to connect to mongoDB server", error);
	}
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
