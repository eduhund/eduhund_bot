const { bot } = require("../telegram");

async function getFileUrl(att) {
  console.log(att);
  const fileId = att[att.length - 1].file_id || att.file_id || undefined;
  if (!fileId) {
    return;
  }
  const filePath = await bot.telegram.getFile(fileId);
  const url = `https://api.telegram.org/file/bot${process.env.TELEGRAM_TOKEN}/${filePath}`;
  return url;
}

module.exports.getFileUrl = getFileUrl;
