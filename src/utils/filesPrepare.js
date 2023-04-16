const { getSlackFileUrl } = require("./getFileUrl");

async function filesPrepare(files = []) {
  try {
    const preparedFiles = [];
    for (const file of files) {
      const data = {
        name: file.name,
        type: file.filetype,
        url: file.url_private_download,
      };
      data.url = await getSlackFileUrl(data);
      preparedFiles.push(data);
    }
    return preparedFiles;
  } catch {
    throw new Error("Files list prepairing failed");
  }
}
module.exports = { filesPrepare };
