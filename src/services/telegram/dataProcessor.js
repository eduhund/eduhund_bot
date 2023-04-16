const { log } = require("../../services/log/log");
const { getTelegramFileUrl } = require("../../utils/getFileUrl");

async function incomingData(data) {
	try {
		const { photo, sticker, document, video, video_note, audio, voice } = data;
		const imageUrl =
			photo || sticker ? await getTelegramFileUrl(photo || sticker) : undefined;
		const media = video || video_note || audio || voice || document;
		const docUrl = media ? await getTelegramFileUrl(media) : undefined;
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
					document: docUrl,
				},
			},
		};
	} catch (e) {
		log.warn("Error with parsing incoming message!\n", e);
		return {};
	}
}

module.exports = { incomingData };
