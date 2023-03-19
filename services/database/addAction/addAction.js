const { ACTIONS } = require("../mongo");

function addAction({ query = {}, returns = [] }) {
  const projection = {
    _id: 0,
  };
  for (const param of returns) {
    projection[param] = 1;
  }
  return ACTIONS.insertOne(query, { projection });
}

module.exports.addAction = addAction;
