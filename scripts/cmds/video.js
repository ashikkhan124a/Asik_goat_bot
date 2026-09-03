const axios = require("axios");

module.exports = {
        config: {
                name: "video",
                aliases: ["ভিডিও"],
                version: "2.1",
                author: "MahMUD",
                countDown: 10,
                role: 0,
                description: {
                        bn: "ইউটিউব থেকে ভিডিও ডাউনলোড করুন",
                        en: "Download video from YouTube",
                        vi: "Tải video từ YouTube"
                },
                category: "media",
                guide: {
                        bn: '   {pn} <নাম বা লিঙ্ক>',
                        en: '   {pn} <name or link>',
                        vi: '   {pn} <tên hoặc liên kết>'
                }
        },

        langs: {
                bn: {
                        noInput: "× ভিডিওর নাম বা লিঙ্ক দিন! 📺",
                        noResult: "× কোনো ভিডিও পাওয়া যায়নি।",
                        success: "✅ 𝙃𝙚𝙧𝙚'𝙨 𝙮𝙤𝙪𝙧 𝙫𝙞𝙙𝙚𝙤 𝙗𝙖𝙗𝙮\n\n• 𝐓𝐢𝐭𝐥𝐞: %1",
                        error: "× সমস্যা হয়েছে: %1"
                }
        },

        onStart: async function ({ api, event, args, message, getLang }) {
                if (!args[0]) return message.reply(getLang("noInput"));

                try {
                        api.setMessageReaction("⏳", event.messageID, () => {}, true);
                        
                        const query = encodeURIComponent(args.join(" "));
                        const searchApi = await axios.get(`https://deliriussapiens-josh-apis.vercel.app/search/yt?q=${query}`);
                        
                        if (!searchApi.data || !searchApi.data.results || searchApi.data.results.length === 0) {
                                api.setMessageReaction("❌", event.messageID, () => {}, true);
                                return message.reply(getLang("noResult"));
                        }

                        const videoInfo = searchApi.data.results[0];
                        const videoUrl = videoInfo.url;
                        const title = videoInfo.title;

                        const downloadApi = await axios.get(`https://deliriussapiens-josh-apis.vercel.app/download/ytmp4?url=${encodeURIComponent(videoUrl)}`);
                        
                        if (!downloadApi.data || !downloadApi.data.download) {
                                api.setMessageReaction("❌", event.messageID, () => {}, true);
                                return message.reply(getLang("noResult"));
                        }

                        const downloadLink = downloadApi.data.download.url;

                        return message.reply({
                                body: getLang("success", title),
                                attachment: await global.utils.getStreamFromURL(downloadLink, "video.mp4")
                        }, () => {
                                api.setMessageReaction("✅", event.messageID, () => {}, true);
                        });

                } catch (err) {
                        console.error("Video Error:", err);
                        api.setMessageReaction("❌", event.messageID, () => {}, true);
                        return message.reply(getLang("error", err.message));
                }
        }
};
