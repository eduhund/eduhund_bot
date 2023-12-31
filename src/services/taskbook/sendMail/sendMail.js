const fetch = require("node-fetch");

const { TASKBOOK_ADMIN_TOKEN } = process.env;

function sendMail(data) {
  return fetch("https://my.eduhund.com/api/teacher/sendMail", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { 
      "Content-Type": "application/json",
      "AccessToken": TASKBOOK_ADMIN_TOKEN
     },
  })
}

module.exports = sendMail