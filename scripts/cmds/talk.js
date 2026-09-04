module.exports = {
    config: {
        name: "talk",
        version: "6.0",
        author: "MahMUD",
        countDown: 2,
        role: 0,
        description: {
            bn: "আপনার সাথে সম্মান ও সঠিক উত্তর এবং অন্যদের সাথে নিখুঁত স্বাভাবিক চ্যাট মডিউল",
            en: "Smart conversational bot with strict owner recognition and accurate context replies"
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

        // ⚠️ আপনার ফেসবুক আইডি (UID) এখানে সেট করা আছে
        const ownerID = "61591763713247"; 

        // বটকে মেনশন করলে, রিপ্লাই দিলে বা কথা বললে ট্রিগার করবে
        const isRepliedToBot = messageReply && messageReply.senderID === botID;
        const isMentioned = event.mentions && event.mentions[botID];

        if (isRepliedToBot || isMentioned || text.includes("bot") || text.includes("বট") || text.includes("কেমন") || text.includes("কি") || text.includes("খা") || text.includes("কর") || text.includes("ki") || text.includes("kemon") || text.includes("tui")) {
            
            let replies = [];

            // ==========================================
            // ১. শুধুমাত্র আপনার (Owner) জন্য সম্মানজনক ও পারফেক্ট রেসপন্স
            // ==========================================
            if (senderID === ownerID || text.includes("ridh")) {
                if (text.includes("ki koro") || text.includes("কি করো") || text.includes("কিকরো")) {
                    replies = [
                        `এই তো বস, আপনার সার্ভার আর চ্যাট বক্স তদারকি করছি। বলুন কী করতে হবে? 💻`,
                        `বসে আছি আপনার হুকুমের অপেক্ষায় বস! বলুন কী করা লাগবে। 🫡`,
                        `আপনার চ্যাট মনিটর করছি বস। কোনো আদেশ আছে কি? ✨`
                    ];
                } else if (text.includes("khai") || text.includes("খাইছো") || text.includes("khaiso") || text.includes("khailam")) {
                    replies = [
                        `আমার তো খাওয়ার প্রয়োজন হয় না বস, তবে আপনার সুস্বাস্থ্য কামনা করি! আপনি কি খাওয়া দাওয়া করেছেন? 🍽️`,
                        `ডিজিটাল মানুষ বস, খাওয়া দাওয়া ছাড়াই বেঁচে আছি! আপনার খাওয়া হয়েছে কি? ☕`,
                        `আপনার দোয়ায় আছি বস। আপনি খেয়েছেন তো ঠিকমতো? 🙏`
                    ];
                } else {
                    replies = [
                        `আসসালামু আলাইকুম বস! বলুন, আপনার জন্য কী করতে পারি? 🫡`,
                        `জি বস, বলুন! আপনার হুকুম তামিল করতে আমি প্রস্তুত আছি। ✨`,
                        `আদেশ করুন বস, কী সেবা করতে পারি আপনার? 🙏`,
                        `আপনার সাথে কথা বলতে পেরে ধন্য বস! বলুন কী জানতে চান। 👑`,
                        `জি বলুন বস, সার্ভার একদম আপনার কন্ট্রোলে আছে। 💻`
                    ];
                }
            } 
            // ==========================================
            // ২. সাধারণ মেম্বারদের জন্য নিখুঁত ও স্বাভাবিক চ্যাট রিপ্লাই (কোনো "বস" বলা হবে না)
            // ==========================================
            else {
                // ক. কেমন আছিস / কি অবস্থা
                if (text.includes("কেমন আছিস") || text.includes("kemon asos") || text.includes("kemon acho") || text.includes("kivabe asis")) {
                    replies = [
                        `আমি ভালো আছি। আপনি কেমন আছেন বলুন? 😊`,
                        `আলহামদুলিল্লাহ, ভালো আছি। আপনার কী খবর?`,
                        `সব ঠিকঠাক আছে। আপনি কেমন আছেন?`,
                        `চলছে কোনোমতে। আপনার দিনকাল কেমন কাটছে?`
                    ];
                } 
                // খ. কি করছিস / কি খবর
                else if (text.includes("কি করস") || text.includes("ki koris") || text.includes("ki kos") || text.includes("ki khobor")) {
                    replies = [
                        `এই তো স্বাভাবিক কাজকর্ম দেখছি আর সবার কথা শুনছি।`,
                        `বিশেষ কিছু না, চ্যাটে সবার সাথে কথা বলছি। আপনার বলুন কী করা হচ্ছে?`,
                        `এমনিতেই বসে আছি। আপনার কোনো সাহায্য লাগবে কি?`,
                        `সব ঠিকঠাক চলছে। আপনার নতুন কোনো খবর আছে নাকি?`
                    ];
                } 
                // গ. খাবি কি / খাওয়ার কথা বললে
                else if (text.includes("খাবি") || text.includes("khaibi") || text.includes("khabi") || text.includes("khaben") || text.includes("khaba")) {
                    replies = [
                        `আমার খাওয়ার তো প্রয়োজন হয় না, তবে আপনার ক্ষুধা লেগে থাকলে খেয়ে নিতে পারেন। 🍽️`,
                        `ধন্যবাদ, আমার এখন খিদে নেই। আপনি চাইলে খেয়ে নিতে পারেন।`,
                        `খাবারের কথা শুনলে তো জিভে জল চলে আসে! ভালো কিছু খাওয়া দাওয়া করুন।`,
                        `আপনার যা পছন্দ, আপনি সেটাই খেতে পারেন।`
                    ];
                }
                // ঘ. সাধারণ বা এলোমেলো কথার নরমাল কালেকশন
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
