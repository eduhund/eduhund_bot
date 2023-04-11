const ru = require("./ru.json");
const en = require("./en.json");

function randomInteger(min, max) {
	return Math.floor(min + Math.random() * (max - min + 1));
}

function getDict(lang) {
	return lang === "en" ? en : ru;
}

function modifyPhrase(string, data) {
	if (typeof string !== "string") {
		throw new Error("Processed value is not a string");
	}
	const regex = /{{(\w+)}}/g;
	return string.replace(regex, (match, key) => {
		if (!data.hasOwnProperty(key) || typeof data[key] !== "string") {
			throw new Error(`Processed data value for key "${key}" is not a string`);
		}
		return data[key];
	});
}

function getPhrase(lang, intent, data = {}) {
	const selLang = getDict(lang);
	let selPhrase = selLang[intent];

	if (!selPhrase) {
		throw new Error(`Intent "${intent}" was not found`);
	}

	switch (typeof selPhrase) {
		case "string":
			break;
		case "object":
			if (selPhrase.length === 0) {
				throw new Error(`Array of phrases for intent "${intent}" is empty`);
			}
			const randomIndex = randomInteger(0, selPhrase.length - 1);
			selPhrase = selPhrase[randomIndex];
			break;
		default:
			throw new Error(`Type of content "${typeof selPhrase}" is not defined`);
	}

	return modifyPhrase(selPhrase, data);
}

module.exports = { getPhrase };
