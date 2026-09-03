module.exports = {
	config: {
		name: "kick",
		version: "1.3",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		description: {
			vi: "Kick thành viên khỏi box chat",
			en: "Kick member out of chat box"
		},
		category: "box",
		guide: {
			vi: "   {pn} @tags: dùng để kick những người được tag",
			en: "   {pn} @tags: use to kick members who are tagged"
		}
	},

	langs: {
		vi: {
			needAdmin: "Vui lòng thêm quản trị viên cho bot trước khi sử dụng tính năng này",
			notAllowed: "⚠️ শুধুমাত্র গ্রুপ অ্যাডমিন অথবা বটের ওনার এই কমান্ডটি ব্যবহার করতে পারবেন!"
		},
		en: {
			needAdmin: "Please add admin for bot before using this feature",
			notAllowed: "⚠️ Only group admins or the bot owner can use this command!"
		},
		bn: {
			needAdmin: "এই ফিচার ব্যবহার করার আগে bot এ admin যোগ করুন",
			notAllowed: "⚠️ শুধুমাত্র গ্রুপ অ্যাডমিন অথবা বটের ওনার এই কমান্ডটি ব্যবহার করতে পারবেন!"
		}
	},

	onStart: async function ({ message, event, args, threadsData, api, getLang }) {
		const myOwnerID = "61591763713247"; // <--- আপনার ফেসবুক UID এখানে লিখবেন
		const threadInfo = await api.getThreadInfo(event.threadID);
		const groupAdmins = threadInfo.adminIDs.map(e => e.id);

		// চেক করবে মেসেজদাতা গ্রুপ অ্যাডমিন কি না অথবা আপনি কি না
		if (!groupAdmins.includes(event.senderID) && event.senderID !== myOwnerID) {
			return message.reply(getLang("notAllowed"));
		}

		const adminIDs = await threadsData.get(event.threadID, "adminIDs");
		if (!adminIDs.includes(api.getCurrentUserID()))
			return message.reply(getLang("needAdmin"));

		async function kickAndCheckError(uid) {
			try {
				await api.removeUserFromGroup(uid, event.threadID);
			}
			catch (e) {
				message.reply(getLang("needAdmin"));
				return "ERROR";
			}
		}
		if (!args.length) {
			if (!event.messageReply)
				return message.SyntaxError();
			await kickAndCheckError(event.messageReply.senderID);
		}
		else {
			const uids = Object.keys(event.mentions);
			if (uids.length === 0)
				return message.SyntaxError();
			if (await kickAndCheckError(uids.shift()) === "ERROR")
				return;
			for (const uid of uids)
				api.removeUserFromGroup(uid, event.threadID);
		}
	}
};
				
