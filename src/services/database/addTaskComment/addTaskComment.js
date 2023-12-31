const { COMMENTS } = require("../mongo");

function addTaskComment({ data, text, threadId }) {
  const query = {
    ...data,
    text,
    threadId,
    ts: Date.now()
  }
	return COMMENTS.insertOne(query);
}

module.exports = addTaskComment;