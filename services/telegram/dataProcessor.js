const { log } = require("../../services/log/log");
const { getTelegramFileUrl } = require("../../utils/getFileUrl");

async function incomingData(data) {
	try {
		const image = data.photo || data.sticker;
		const document = data.document;
		const video = data.video || data.video_note;
		const audio = data.audio || data.voice;
		const imageUrl = image ? await getTelegramFileUrl(image) : undefined;
		const docUrl = document ? await getTelegramFileUrl(document) : undefined;
		const videoUrl = video ? await getTelegramFileUrl(video) : undefined;
		const audioUrl = audio ? await getTelegramFileUrl(audio) : undefined;
		return {
			from: {
				userId: data?.from?.id,
				username: data?.from?.username,
				firstName: data?.from?.first_name,
				lastName: data?.from?.last_name,
				lang: data?.from?.language_code,
			},
			message: {
				id: data?.message?.message_id || data?.message_id,
				cbId: data?.id,
				date: data?.date,
				editDate: data?.edit_date,
				text: data?.text || data?.caption || data?.data || " ",
				att: {
					image: imageUrl,
					document: docUrl || videoUrl || audioUrl,
				},
			},
		};
	} catch (e) {
		log.warn("Error with parsing incoming message!\n", e);
		return {};
	}
}

module.exports = { incomingData };
