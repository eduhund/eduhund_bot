const PARAMS = {
	addAction: ["userId", "role", "code", "action", "ts"],
	addUser: [
		"userId",
		"username",
		"firstName",
		"lastName",
		"subscribeDate",
		"blocked",
		"lang",
	],
	createThread: [
		"userId",
		"source",
		"dest",
		"role",
		"ts",
		"threadId",
		"active",
		"lastIncMessage",
	],
	getStudentInfo: ["email"],
};

function checkQuery(type, query) {
	if (!query || typeof query !== "object") {
		throw new Error("Query parameter is required and should be an object");
	}

	if (!(type in PARAMS)) {
		return true;
	}

	const missingParams = PARAMS[type].filter((param) => !(param in query));

	if (missingParams.length) {
		const missingParamsString = missingParams.join(", ");
		throw new Error(
			`Missing required query parameter(s): ${missingParamsString}`
		);
	}

	return true;
}

function getProjection(returns) {
	const projection = {
		_id: 0,
	};
	for (const param of returns) {
		projection[param] = 1;
	}
	return projection;
}

module.exports = { checkQuery, getProjection };
