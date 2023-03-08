const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGO_URL);
mongoClient.connect();

const USERS = mongoClient.db(process.env.BOT_DATABASE).collection("users");
const THREADS = mongoClient.db(process.env.BOT_DATABASE).collection("threads");
const ACTIONS = mongoClient.db(process.env.BOT_DATABASE).collection("actions");

const STUDENTS = mongoClient
  .db(process.env.PLATFORM_DATABASE)
  .collection("users");

module.exports = { USERS, THREADS, ACTIONS, STUDENTS };
