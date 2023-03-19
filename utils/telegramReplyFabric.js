const { getPhrase } = require("@assets/dict/dict");

const KEYBOARDS = {
  settings({ lang }) {
    return {
      inline_keyboard: [
        [
          {
            text: getPhrase(lang, "changeEmailButton"),
            callback_data: "changeEmailButton",
          },
        ],
        [
          {
            text: getPhrase(lang, "updateModulesButton"),
            callback_data: "updateModulesButton",
          },
        ],
      ],
    };
  },
};

function getKeyboard(lang, intent, data) {
  return KEYBOARDS[intent]({ lang, data });
}

module.exports = { getKeyboard };
