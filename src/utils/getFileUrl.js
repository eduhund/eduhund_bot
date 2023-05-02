const fetch = require("node-fetch");
const fs = require("fs");
const { bot } = require("../services/telegram/telegram");

function sendFileToStorage({ url, name, type }) {
	try {
		fetch(
			`${process.env.T_FILE_DOWNLOADER}?fileUrl=${url}&name=${name}&type=${type}`,
			{
				method: "GET",
			}
		);
	} catch (e) {
		log.warn("File didn't save to Google Drive\n", e);
	}
}

async function getTelegramFileUrl(att) {
	const fileId = att[att.length - 1]?.file_id || att?.file_id || undefined;
	if (!fileId) {
		return;
	}
	try {
		const fileUrl = await bot.telegram.getFileLink(fileId);
		sendFileToStorage({ url: fileUrl });
		return fileUrl;
	} catch {
		throw new Error("");
	}
}

async function getSlackFileUrl(file) {
	if (!file) {
		return;
	}

	const data = await fetch(
		`${process.env.S_FILE_DOWNLOADER}?fileUrl=${file.url}&name=${file.name}&type=${file.type}&stage=${process.env.MACHINE}`,
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
