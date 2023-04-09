const ACTIONS = {
	1: {},
	2: {},
	3: {},
	4: {},
	5: {},
	6: {},
	7: {},
	8: {
		action: "Pet the cat",
	},
};

function getActionQuery(code, role, userId) {
	const now = Date.now();

	const action = Object.freeze(ACTIONS[code]);

	return {
		query: {
			...action,
			userId,
			role,
			code,
			ts: now,
		},
	};
}

module.exports = getActionQuery;
