const { ACTIONS } = require("../mongo");

const requiredParams = ["userId", "role", "code", "action", "ts"];

async function addAction({ query = {} }) {
	if (!query || typeof query !== "object") {
		throw new Error("Query parameter is required and should be an object");
	}

	const missingParams = requiredParams.filter((param) => !(param in query));

	if (missingParams.length) {
		const missingParamsString = missingParams.join(", ");
		throw new Error(
			`Missing required query parameter(s): ${missingParamsString}`
		);
	}

	return ACTIONS.insertOne(query);
}

module.exports = addAction;
