const { HISTORY } = require("../mongo");

function addToHistory({ query = {}, returns = [] }) {
  const projection = {
    _id: 0,
  };
  for (const param of returns) {
    projection[param] = 1;
  }
  return HISTORY.insertOne(query, { projection });
}

module.exports.addToHistory = addToHistory;
