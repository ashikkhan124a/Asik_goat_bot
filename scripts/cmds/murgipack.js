module.exports = {
    config: {
        name: "murgipack",
        version: "2.1",
        author: "MahMUD",
        countDown: 3,
        role: 0,
        description: {
            bn: "অটো রোস্ট এবং গালাগালি ফিল্টার মডিউল",
            en: "Advanced auto roast module"
        },
        category: "box",
        guide: {
            bn: "   {pn}: অটোমেটিক গালি ধরবে এবং রোস্ট করবে",
            en: "   {pn}: Auto roasts bad words"
        }
    },

    onStart: async function () {},

    onChat: async function ({ api, event, message }) {
        const { body, senderID } = event;
        if (!body) return;

        const text = body.toLowerCase();

        const badWords = [
            "murgi", "b*l", "bal", "balsal", "chuda", "chudi", "chod", "madrchod", 
            "madarchod", "maderchod", "bokin", "bokachoda", "bokachodo", "magi", 
            "magiii", "salha", "shala", "shali", "harami", "haramjada", "fokir", 
            "chuthiya", "guro", "puchki", "baler"
        ];
        
        if (senderID === api.getCurrentUserID()) return;

        const hasBadWord = badWords.some(word => text.includes(word));

        if (hasBadWord) {
            const roasts = [
                `@${senderID} tor mar bhodaiye katar berra diya tanani marum sala madarchod! Ridh amader bhai, ar tor moto khankir pola amar jutor tolay thake. 🖕`,
                `@${senderID} tor mar pichon dia bash dhukaya samne dia bair korum! Ridh ke niye faltugiri korle tor ma er gola kete rohot kire dimu kuttar bacha. 🔪`,
                `@${senderID} tor mar chudir bal chira hat a dhoraya dimu sala khanki-magir pola! Ridh er samne asar aukat tor baper o nai. 🐕`,
                `@${senderID} tor mar bhodai-mukh a tatti lagaia dimu! Ridh amader boss, ar tui ekta rasta theke kura ana tatti-khor khanki-pola. 💩`,
                `@${senderID} tor mar pet fariaya vitor theke tui ber hoisili naki re harami? Ridh bhai ke niye kotha koile tor hat-pa kete kukur e khawamu. 🍖`,
                `@${senderID} tor mar chudni-gari te toke thele fele dimu! Ridh amader shobkichu, ar tor moto shala chuda-khorer kono dam nai. 🚛`,
                `@${senderID} tor mar bhodaiyer bitore bomb phutaia chouchir koira dimu! Ridh er name faltugiri korle tor gushti nirmul koira dimu. 💣`,
                `@${senderID} tor mar gola tipe dhoriya lalkal baitta felum sala madarchod! Ridh amr bhai, ar tui ekta gader mut-khor. 🤮`,
                `@${senderID} tor mar shob dather gora kete hat a dhoraya dimu! Ridh er sathe lagte aschis kon chudar bhai hisebe re fqir? 🦷`,
                `@${senderID} tor mar bhodaiye shial-kukur namaiya dimu! Ridh amader pran, ar tui ekta shala vagarer pacha-chata kukur. 🦊`,
                `@${senderID} tor mar mathay alkatra dhaloia ghoray ghoray bikri korum! Ridh er sathe be-adobi korle tor chotku udiye dimu khankir pola. 🫏`,
                `@${senderID} tor mar pither chamra diye dhol banaiya biye bari te baja-mu! Ridh er nam mukhe anbi na ar konodin sala bhodai. 🪘`,
                `@${senderID} tor mar chudir gorto cement diye bondho koira dimu! Ridh amader boss, ar tui ekta nardamar pokamakor. 🧱`,
                `@${senderID} tor mar bhodaiye indur-bichu dhukaya fani tulia dimu! Ridh er shate be-adobi korle tor shob chul uira dimu. 🦂`,
                `@${senderID} tor mar gola theke rokto chushe khawamu sala shuyorer bacha! Ridh er samne tui ekta tuchcho tatti-khor. 🩸`,
                `@${senderID} tor mar gushti shodh koira fali dimu ekdm! Ridh amader jaan, ar tui ekta haramjadar pola. ⚰️`,
                `@${senderID} tor mar chudir mashin a toke pisha powder banamu! Ridh bhai ke niye kotha koile tor mar kase লাশ pathaya dimu. ⚙️`,
                `@${senderID} tor mar bhodaiye agun dhiraya poraiya marum sala madarchod! Ridh amr shobkichu, ar tui ekta kuttar mala. 🔥`,
                `@${senderID} tor mar chudni-bazar bosaiya toke 1 takay biki korum! Ridh er name faltugiri korle tor gari gutaaiya fali felum. 🏷️`,
                `@${senderID} tor mar bhodai fantaia katar berra dimu sala fqir! Ridh amader sobkichu, ar tui ekta nona pagoler pola. ⚡`
            ];

            const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];

            return message.reply({
                body: randomRoast,
                mentions: [{ tag: `@${senderID}`, id: senderID }]
            });
        }
    }
};
              
