const { getPhrase } = require("@assets/dict/dict");

const KEYBOARDS = {
  settings({ lang }) {
    return {
      inline_keyboard: [
        [
          {
            text: getPhrase(lang, "changeEmailButton"),
            callback_data: "tChangeEmailButton",
          },
        ],
        [
          {
            text: getPhrase(lang, "updateModulesButton"),
            callback_data: "tUpdateModulesButton",
          },
        ],
      ],
    };
  },
  changeEmailInit({ lang }) {
    return {
      inline_keyboard: [
        [
          {
            text: getPhrase(lang, "cancelButton"),
            callback_data: "tCancelButton",
          },
        ],
      ],
    };
  },
  changeEmailError({ lang }) {
    return {
      inline_keyboard: [
        [
          {
            text: getPhrase(lang, "cancelButton"),
            callback_data: "tCancelButton",
          },
        ],
      ],
    };
  },
  changeEmailFail({ lang }) {
    return {
      inline_keyboard: [
        [
          {
            text: getPhrase(lang, "cancelButton"),
            callback_data: "tCancelButton",
          },
        ],
      ],
    };
  },
};

function getKeyboard(lang, intent, data) {
  if (KEYBOARDS[intent]) {
    return KEYBOARDS[intent]({ lang, data });
  } else return undefined;
}

module.exports = { getKeyboard };
