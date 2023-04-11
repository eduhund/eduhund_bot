function getRule(number, titles) {
	number = Math.abs(number);
	const cases = [2, 0, 1, 1, 1, 2];
	const phrase =
		titles[
			number % 100 > 4 && number % 100 < 20
				? 2
				: cases[number % 10 < 5 ? number % 10 : 5]
		];
	return `${number} ${phrase}`;
}

function catReport({ to, data }) {
	const i = data.count;
	return {
		channel: to.channelId,
		text:
			i === 0
				? "Вчера котика никто не гладил :("
				: `Вчера котика погладили ${getRule(i, ["раз", "раза", "раз"])} `,
	};
}

module.exports = catReport;
