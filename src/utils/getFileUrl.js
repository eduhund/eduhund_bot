const fetch = require("node-fetch");

async function getTelegramFileUrl(att) {
  const fileId = att[att.length - 1]?.file_id || att?.file_id || undefined;
  if (!fileId) {
    return;
  }
  const data = await fetch(
    `${process.env.T_FILE_DOWNLOADER}?fileId=${fileId}`,
    {
      method: "GET",
    }
  ).then((response) => {
    return response.json();
  });
  const url = data?.url;
  return url;
}

async function getSlackFileUrl(file) {
  if (!file) {
    return;
  }

  const data = await fetch(
    `${process.env.S_FILE_DOWNLOADER}?fileUrl=${file.url}&name=${file.name}&type=${file.type}`,
    {
      method: "GET",
    }
  ).then((response) => {
    return response.json();
  });
  const url = data?.url;
  return url;
}

module.exports = { getTelegramFileUrl, getSlackFileUrl };
