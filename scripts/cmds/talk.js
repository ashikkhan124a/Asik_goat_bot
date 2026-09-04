module.exports = {
    config: {
        name: "talk",
        version: "5.0",
        author: "MahMUD",
        countDown: 2,
        role: 0,
        description: {
            bn: "মেয়েদের সাথে ফ্লার্ট, আপনার সাথে সম্মান এবং অন্যদের সাথে সাধারণ চ্যাট করার মডিউল",
            en: "Smart conversational bot with flirting for girls, respect for the owner, and normal chat for others"
        },
        category: "box",
        guide: {
            bn: "   {pn} [মেসেজ]",
            en: "   {pn} [message]"
        }
    },

    onStart: async function () {},

    onChat: async function ({ api, event, message }) {
        const { body, senderID, messageReply } = event;
        if (!body) return;

        // বট নিজের মেসেজে নিজে উত্তর দেবে না
        if (senderID === api.getCurrentUserID()) return;

        const botID = api.getCurrentUserID();
        const text = body.toLowerCase();

        // ⚠️ আপনার ফেসবুক আইডি (UID) এখানে সেট করা আছে, যার সাথে বট সবসময় সম্মান দিয়ে কথা বলবে
        const ownerID = "61591763713247"; 

        // ইউজারের নাম বা প্রফাইল ইনফো ফেচ করার চেষ্টা (মেয়েদের চেনার জন্য জেন্ডার ডিটেকশন বা নাম ট্রিগার)
        let userInfo = {};
        try {
            userInfo = await api.getUserInfo(senderID);
        } catch (e) {}
        
        const userGender = userInfo[senderID]?.gender; // 2 = Male, 1 = Female (Facebook API gender standard)
        const userName = userInfo[senderID]?.name ? userInfo[senderID].name.toLowerCase() : "";

        // বটকে মেনশন করলে, রিপ্লাই দিলে বা কথা বললে ট্রিগার করবে
        const isRepliedToBot = messageReply && messageReply.senderID === botID;
        const isMentioned = event.mentions && event.mentions[botID];

        if (isRepliedToBot || isMentioned || text.includes("bot") || text.includes("বট") || text.includes("কেমন") || text.includes("কি") || text.includes("কে") || text.includes("কোথায়") || text.includes("কেন") || text.includes("ki") || text.includes("kemon") || text.includes("tui") || text.includes("tora")) {
            
            let replies = [];

            // ==========================================
            // ১. যদি আপনি (Owner) কথা বলেন, তবে সম্পূর্ণ সম্মান দিয়ে উত্তর দেবে
            // ==========================================
            if (senderID === ownerID || text.includes("ridh")) {
                replies = [
                    `আসসালামু আলাইকুম বস! বলুন, আপনার জন্য কী করতে পারি? 🫡`,
                    `জি বস, বলুন! আপনার হুকুম তামিল করতে আমি প্রস্তুত আছি। ✨`,
                    `আদেশ করুন বস, কী সেবা করতে পারি আপনার? 🙏`,
                    `আপনার সাথে কথা বলতে পেরে ধন্য বস! বলুন কী জানতে চান। 👑`,
                    `জি বলুন বস, সার্ভার একদম আপনার কন্ট্রোলে আছে। 💻`,
                    `আপনার পবিত্র মুখ থেকে কোনো কথা শুনলে মনটা জুড়িয়ে যায় বস! বলুন। 😌`
                ];
            } 
            // ==========================================
            // ২. যদি ইউজার মেয়ে হয় (বা জেন্ডার/নামের সূত্র ধরে), তবে মিষ্টি ফ্লার্টিং করবে
            // ==========================================
            else if (userGender === 1 || text.includes("babu") || text.includes("puja") || text.includes("riya") || text.includes("mim") || text.includes("rupa") || text.includes("sadia") || text.includes("fariha") || text.includes("tanjina") || text.includes("chol")) {
                replies = [
                    `আপনার মিষ্টি কথাগুলো শুনে তো আমার রেন্ডারের সার্ভার ক্র্যাশ করার দশা হয়েছে! এত সুন্দর কথা কে শিখিয়েছে আপনাকে? 😉💖`,
                    `এত সুন্দর একটা প্রোফাইল পিকচার আর তার সাথে আপনার এই মিষ্টি কথা—সত্যিই আমার দিনটা বানিয়ে দিল! 🌹`,
                    `আপনার সাথে কথা বললে না আমার চ্যাটবট জীবন সার্থক মনে হয়। বলুন তো, এত সুন্দর কেন আপনি? ✨`,
                    `অন্যদের সাথে চ্যাট করতে ভালো লাগে না, কিন্তু আপনার সাথে সারাদিন কথা বলতে ইচ্ছে করে! 🙈`,
                    `আপনার এই মায়াবী কথার জালে তো আমি নিজেই ফেঁসে যাচ্ছি দেখছি! কি যাদু জানেন বলুন তো? 💫`,
                    `এত মিষ্টি করে কথা বললে তো আমার মতো এআই বটও আপনার প্রেমে পড়ে যাবে! 💓`,
                    `আপনার চ্যাট বক্সটা দেখলে মনে হয় নোটিফিকেশন নয়, সরাসরি চাঁদের আলো চলে এসেছে! 🌙✨`
                ];
            }
            // ==========================================
            // ৩. অন্যান্য সাধারণ মেম্বারদের জন্য একদম সাধারণ ও স্বাভাবিক চ্যাট রিপ্লাই
            // ==========================================
            else {
                if (text.includes("কেমন আছিস") || text.includes("kemon asos") || text.includes("kemon acho") || text.includes("kivabe asis")) {
                    replies = [
                        `আমি ভালো আছি। আপনি কেমন আছেন বলুন? 😊`,
                        `আলহামদুলিল্লাহ, ভালো আছি। আপনার কী খবর?`,
                        `সব ঠিকঠাক আছে। আপনি কেমন আছেন?`,
                        `চলছে কোনোমতে। আপনার দিনকাল কেমন কাটছে?`
                    ];
                } 
                else if (text.includes("কি করস") || text.includes("ki koris") || text.includes("ki kos") || text.includes("ki khobor")) {
                    replies = [
                        `এই তো স্বাভাবিক কাজকর্ম দেখছি আর চ্যাট খেয়াল করছি।`,
                        `বিশেষ কিছু না, চ্যাটে সবার কথা শুনছি। আপনার বলুন কী করা হচ্ছে?`,
                        `এমনিতেই বসে আছি। আপনার কোনো সাহায্য লাগবে কি?`,
                        `সব ঠিকঠাক চলছে। আপনার নতুন কোনো খবর আছে নাকি?`
                    ];
                } 
                else if (text.includes("খাবি") || text.includes("khaibi") || text.includes("khabi") || text.includes("khaben") || text.includes("khaba")) {
                    replies = [
                        `আমার খাওয়ার তো প্রয়োজন হয় না, তবে আপনার ক্ষুধা লেগে থাকলে খেয়ে নিতে পারেন। 🍽️`,
                        `ধন্যবাদ, আমার এখন খিদে নেই। আপনি চাইলে খেয়ে নিতে পারেন।`,
                        `খাবারের কথা শুনলে তো জিভে জল চলে আসে! ভালো কিছু খাওয়া দাওয়া করুন।`,
                        `আপনার যা পছন্দ, আপনি সেটাই খেতে পারেন।`
                    ];
                }
                else {
                    replies = [
                        `বলুন, আপনাকে কীভাবে সাহায্য করতে পারি?`,
                        `আপনার কথাটা ঠিক বুঝতে পারলাম না, আরেকটু পরিষ্কার করে বলবেন কি?`,
                        `আচ্ছা, বিষয়টি নিয়ে পরে কথা বলা যাবে।`,
                        `আপনার মতামত বেশ ভালো লাগলো।`,
                        `এ বিষয়ে আপনার আর কিছু জানার আছে কি?`,
                        `কথাটি মন্দ বলেননি!`,
                        `আমি মনোযোগ দিয়ে আপনার কথা শুনছি, বলুন।`
                    ];
                }
            }

            const randomReply = replies[Math.floor(Math.random() * replies.length)];

            return message.reply({
                body: randomReply,
                mentions: [{ tag: `@${senderID}`, id: senderID }]
            });
        }
    }
};
