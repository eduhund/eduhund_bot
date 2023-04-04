const fetch = require("node-fetch");

async function getLogicModule(userId) {
	const data = await fetch(`${process.env.T_LOGIC_LIST}?userId=${userId}`, {
		method: "GET",
	}).then((response) => {
		return response.json();
	});
	const url = data?.url;
	return url;
}

module.exports = { getLogicModule };
