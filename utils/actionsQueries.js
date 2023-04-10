const ACTIONS = {
	1: { action: "Bot start" },
	2: { action: "User help" },
	3: { action: "User settings" },
	4: { action: "Change email request" },
	5: { action: "Change email success" },
	6: { action: "Change email error" },
	7: { action: "Change email fail" },
	8: { action: "Pet the cat" },
	9: { action: "Get logic" },
	10: { action: "Send message to many users" },
	11: { action: "Send direct message to some users" },
	12: { action: "Close thread" },
	13: { action: "Reopen thread" },
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
