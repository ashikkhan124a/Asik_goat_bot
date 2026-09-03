const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports = {
  config: {
    name: "owner",
    version: "1.3.0",
    author: "Ridh Islam ayan",
    role: 0,
    shortDescription: "Owner information with image",
    category: "Information",
    guide: {
      en: "owner"
    }
  },

  onStart: async function ({ api, event }) {
    const ownerText = 
`╭─ 👑 Oᴡɴᴇʀ Iɴғᴏ 👑 ─╮
│ 👤 Nᴀᴍᴇ       : Ridh Islam Ayan 
│ 🧸 Nɪᴄᴋ       : Rid
│ 🎂 Aɢᴇ        : 17
│ 💘 Rᴇʟᴀᴛɪᴏɴ : Sɪɴɢʟᴇ
│ 🎓 Pʀᴏғᴇssɪᴏɴ : Job holders 
│ 📚 Eᴅᴜᴄᴀᴛɪᴏɴ : Scc 2025
│ 🏡 Lᴏᴄᴀᴛɪᴏɴ : Cox Bazar- Bangladesh 
├─ 🔗 Cᴏɴᴛᴀᴄᴛ ─╮
│ 📘 Facebook  : fb.com/ayan xhowdhury 
│ 💬 Messenger: m.me/ayan xhowdhury 
│ 📞 WhatsApp  : wa.me/01825784274
╰────────────────╯`;

    const cacheDir = path.join(__dirname, "cache");
    const imgPath = path.join(cacheDir, "owner.jpg");

    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

    const imgLink = "https://i.postimg.cc/3RghXCnX/IMG-20260601-150213.jpg";

    const send = () => {
      api.sendMessage(
        {
          body: ownerText,
          attachment: fs.createReadStream(imgPath)
        },
        event.threadID,
        () => fs.unlinkSync(imgPath),
        event.messageID
      );
    };

    request(encodeURI(imgLink))
      .pipe(fs.createWriteStream(imgPath))
      .on("close", send);
  }
};
