const fetch = require("node-fetch");

const { bot } = require("../telegram");

async function getFileUrl(att) {
  const fileId = att[att.length - 1].file_id || att.file_id || undefined;
  if (!fileId) {
    return;
  }
  const data = await fetch(`${process.env.FILE_DOWNLOADER}?fileId=${fileId}`, {
    method: "GET",
  }).then((response) => {
    return response.json();
  });
  const url = data?.url;
  return url;
}

module.exports.getFileUrl = getFileUrl;
