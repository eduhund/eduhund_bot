const { getSlackFileUrl } = require("./getFileUrl");

async function filesPrepare(files = []) {
  try {
    const preparedFiles = [];
    for (const file of files) {
      const data = {
        name: file.name,
        type: file.pretty_type,
        url: file.url_private_download,
      };
      const newUrl = await getSlackFileUrl(data);
      data.url = newUrl;
      preparedFiles.push(data);
    }
    return preparedFiles;
  } catch {
    throw new Error("Files list prepairing failed");
  }
}
module.exports = { filesPrepare };
