// একটিভ রেইড বা স্প্যাম লিস্ট এবং ওনারের আইডি ট্র্যাক করার জন্য গ্লোবাল স্টোরেজ
const activeSpamSessions = new Map();

module.exports = {
    config: {
        name: "murgipack",
        version: "4.1",
        author: "MahMUD",
        countDown: 3,
        role: 0,
        description: {
            bn: "শুধুমাত্র আপনার কমান্ডে চলবে এবং আপনি ছাড়া কেউ থামাতে পারবে না",
            en: "Continuous spam roast controlled strictly by the command runner"
        },
        category: "box",
        guide: {
            bn: "   {pn} @mention (শুরু করতে)\n   thamo (বন্ধ করতে - শুধুমাত্র আপনি পারবেন)",
            en: "   {pn} @mention to start\n   thamo to stop (Only command runner)"
        }
    },

    onStart: async function ({ api, event, message }) {
        const { senderID, mentions, threadID } = event;
        const bodyText = event.body ? event.body.toLowerCase() : "";

        // চেক করা যাক কেউ "thamo" বা "stop" লিখেছে কি না
        if (bodyText === "thamo" || bodyText === "stop") {
            if (activeSpamSessions.has(threadID)) {
                const session = activeSpamSessions.get(threadID);
                // শুধু যে শুরু করেছিল (owner), সে ছাড়া অন্য কেউ থামালে কাজ করবে না
                if (senderID !== session.ownerID) {
                    return message.reply("এই রেইড থামানোর অধিকার শুধু যে কমান্ড দিয়েছে তারই আছে! অন্য কেউ থামাতে পারবে না। 🚷");
                }

                clearInterval(session.intervalID);
                activeSpamSessions.delete(threadID);
                return message.reply("আপনার নির্দেশে রেইড থামানো হয়েছে! 🛑");
            }
            return;
        }

        // কাউকে মেনশন করা হয়েছে কি না চেক করা
        const mentionedIDs = Object.keys(mentions);
        if (mentionedIDs.length === 0) {
            return message.reply("দয়া করে যাকে রোস্ট করতে চান তাকে মেনশন করুন! যেমন: /murgipack @User");
        }

        const targetID = mentionedIDs[0];

        // যদি অলরেডি এই গ্রুপে রেইড চলতে থাকে
        if (activeSpamSessions.has(threadID)) {
            return message.reply("এই গ্রুপে ইতিমধ্যে স্প্যাম রোস্ট চলছে! থামাতে চাইলে শুধু আপনি 'thamo' লিখুন।");
        }

        // কড়া ও ডেস্ট্রাক্টিভ রোস্টের লিস্ট
        const roasts = [
            `@${targetID} tor mar bhodai-mukh a katar bera diya talani marum sala madarchod! Ridh bhai er samne asar aukat tor baap-dadar o chilo na. 🖕`,
            `@${targetID} tor mar chudir bhetor bomb phutaia toke o tar gosti shodh ekshathe uraiya dimu! Ridh bhai kothay ar tor aukat kothay, tui ekta fokir. 💣`,
            `@${targetID} tor mar pichon dia bash dhukaya samne dia bair koira mela bosaimu! Ridh er level a jaite হলে তোরে জন্ম জন্মান্তর তপস্যা করতে হবে, শালা শুয়োর। 🎋`,
            `@${targetID} tor mar pet fariaya vitor theke tui ber hoisili naki re harami? Ridh er nam mukhe anbi na ar konodin, tor chotku udiye dimu. 🥩`,
            `@${targetID} tor mar chudni-gari te toke thele fele pisha powder banai dimu! Ridh amader sobkichu, ar tor moto shala chuda-khorer kono dam nai. 🚛`,
            `@${targetID} tor mar bhodaiyer bitore shial-bichu dhukaya fani tulia dimu! Ridh er name faltugiri korle tor gushti nirmul koira dimu. 🦂`,
            `@${targetID} tor mar gola tipe dhoriya rokto chushe khawamu sala shuyorer bacha! Ridh bhai er sathe tulona করার মতো যোগ্যতাও তোর নাই। 🩸`,
            `@${targetID} tor mar shob dather gora kete hat a dhoraya mardur banamu! Ridh er sathe lagte aschis kon chudar bhai hisebe re fqir? 🦷`,
            `@${targetID} tor mar mathay alkatra dhaloia ghoray ghoray bikri korum! Ridh er level a পৌঁছানোর স্বপ্ন দেখা বাদ দে, খংকির পোলা। 🫏`,
            `@${targetID} tor mar pither chamra diye dhol banaiya biye bari te baja-mu! Ridh bhai er samne tui ekta tuchcho tatti-khor. 🪘`,
            `@${targetID} tor mar chudir gorto cement diye bondho koira dimu! Ridh amader queen, ar tui ekta nardamar pokamakor. 🧱`,
            `@${targetID} tor mar bhodaiye indur-sap dhukaya chouchir koira dimu! Ridh er shate be-adobi korle tor mar kase লাশ pathaya dimu. 🐍`,
            `@${targetID} tor mar gola theke matha alada koira katar berra dimu! Ridh amader jaan, ar tui ekta haramjadar pola. 🪓`,
            `@${targetID} tor mar chudir mashin a toke fali fali koira katum! Ridh bhai ke niye kotha koile tor ma er gola kete rohot kire dimu. ⚙️`,
            `@${targetID} tor mar bhodaiye agun dhiraya poraiya marum sala madarchod! Ridh amr shobkichu, ar tui ekta kuttar mala. 🔥`,
            `@${targetID} tor mar chudni-bazar bosaiya toke 1 takay biki korum! Ridh er name faltugiri korle tor gari gutaaiya fali felum. 🏷️`,
            `@${targetID} tor mar bhodai fantaia katar berra dimu sala fqir! Ridh er level a আসার আগে নিজের বাপ কে খুঁজে বের কর, আবালের দল। ⚡`,
            `@${targetID} tor mar gushti nirmul koira mela bosaimu! Ridh bhai ke niye faltugiri korle tor chotku udiye dimu ekdm. 🎪`,
            `@${targetID} tor mar chudir bal chira hat a dhoraya dimu sala khanki-magir pola! Ridh er samne asar aukat tor baper o nai. 🐕`,
            `@${targetID} tor mar bhodai-mukh a tatti lagaia rasta theke kura ana tatti-khor banamu! Ridh amader boss, ar tui ekta fokir. 💩`
        ];

        // প্রথম মেসেজ পাঠানো
        const initialRoast = roasts[Math.floor(Math.random() * roasts.length)];
        await api.sendMessage({
            body: initialRoast,
            mentions: [{ tag: `@${targetID}`, id: targetID }]
        }, threadID);

        // লুপ চালু করা (প্রতি ৫ সেকেন্ড পরপর গালি দিতে থাকবে)
        const intervalID = setInterval(async () => {
            const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
            try {
                await api.sendMessage({
                    body: randomRoast,
                    mentions: [{ tag: `@${targetID}`, id: targetID }]
                }, threadID);
            } catch (err) {
                clearInterval(intervalID);
                activeSpamSessions.delete(threadID);
            }
        }, 5000);

        // সেভ করে রাখা কে কমান্ডটি চালু করেছে (ownerID)
        activeSpamSessions.set(threadID, {
            ownerID: senderID,
            intervalID: intervalID
        });
    },

    onChat: async function ({ api, event }) {
        const { threadID, senderID, body } = event;
        if (!body) return;

        const bodyText = body.toLowerCase();

        // চ্যাটে কেউ "thamo" বা "stop" লিখলে চেক করা
        if ((bodyText === "thamo" || bodyText === "stop") && activeSpamSessions.has(threadID)) {
            const session = activeSpamSessions.get(threadID);
            
            // অন্য কেউ থামালে বট রিয়াক্ট করবে না বা থামবে না
            if (senderID !== session.ownerID) {
                return; // চুপ থাকবে
            }

            clearInterval(session.intervalID);
            activeSpamSessions.delete(threadID);
            return api.sendMessage("আপনার নির্দেশে রেইড বন্ধ করা হয়েছে! 🛑", threadID);
        }
    }
};
