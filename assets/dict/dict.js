const ru = require("./ru.json");
const en = {};

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function getDict(lang) {
  switch (lang) {
    case "en":
      return en;
    default:
      return ru;
  }
}

function modifyPhrase(string, data) {
  const prefix = "{{";
  const suffix = "}}";
  if (typeof string !== "string") {
    throw new Error("Processed value is not a string");
  }
  for (const [key, value] of Object.entries(data)) {
    if (typeof value !== "string") {
      throw new Error("Processed data value is not a string");
    }
    string = string.replaceAll(prefix + key + suffix, value);
  }
  return string;
}

function getPhrase(lang, intent, data = {}) {
  const selLang = getDict(lang);
  try {
    var selPhrase = selLang[intent];
    if (!selPhrase) {
      throw new Error(`Intent ${intent} wasn't found`);
    }
    switch (typeof selPhrase) {
      case "string":
        break;
      case "object":
        selPhrase = selPhrase[randomInteger(0, selPhrase.length - 1)];
        break;
      default:
        throw new Error(`Type of content ${typeof selPhrase} is not defined`);
    }
  } catch (error) {
    console.error(error);
  }
  return modifyPhrase(selPhrase, data);
}

module.exports.getPhrase = getPhrase;
