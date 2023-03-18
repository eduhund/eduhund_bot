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

function getPhrase(lang, intent) {
  const selLang = getDict(lang);
  try {
    const selPhrase = selLang[intent];
    if (!selPhrase) {
      throw new Error(`Intent ${intent} wasn't found`);
    }
    switch (typeof selPhrase) {
      case "string":
        return selPhrase;
      case "object":
        return selPhrase[randomInteger(0, selPhrase.length - 1)];
      default:
        throw new Error(`Type of content ${typeof selPhrase} is not defined`);
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports.getPhrase = getPhrase;
