require("dotenv").config();


const TelegramBot = require("node-telegram-bot-api");


const {
    startWhatsApp,
    pairWhatsApp,
    getSocket
} = require("./whatsapp");



const blockCycle =
require("./commands/blockcycle");



const status =
require("./commands/status");




const bot =
new TelegramBot(
    process.env.TELEGRAM_TOKEN,
    {
        polling:true
    }
);



startWhatsApp();



function isOwner(msg){

    return String(msg.from.id)
    ===
    String(process.env.OWNER_ID);

}



function menu(){


return {

reply_markup:{

inline_keyboard:[

[
{
text:"🔗 Pair WhatsApp",
callback_data:"pair"
}
],

[
{
text:"📱 Status",
callback_data:"status"
}
],

[
{
text:"⚡ Block Manager",
callback_data:"block"
}
],

[
{
text:"👑 Dev",
callback_data:"dev"
}
]

]

}

};

}



// START

bot.onText(
/\/start/,

(msg)=>{


bot.sendMessage(

msg.chat.id,

`
╭━━━━━━━━━━━━━━━━━━╮
┃   𝐄𝐌𝐄𝐑𝐀𝐔𝐃𝐄 𝐁𝐋𝐎𝐂𝐊
╰━━━━━━━━━━━━━━━━━━╯

🤖 WhatsApp Manager

📱 Système actif

👑 Dev :
${process.env.DEV}

━━━━━━━━━━━━━━━━━━

Choisis une option :
`,

menu()

);


});





// PAIR

bot.onText(
/\/pair (.+)/,

async(msg,match)=>{


if(!isOwner(msg))
return;



const number =
match[1]
.replace(/\D/g,"");



if(!number){

return bot.sendMessage(
msg.chat.id,
"❌ Numéro invalide"
);

}



pairWhatsApp(

number,

(text)=>{


bot.sendMessage(
msg.chat.id,
text
);


}

);



});






// STATUS

bot.onText(
/\/status/,

(msg)=>{


if(!isOwner(msg))
return;



bot.sendMessage(

msg.chat.id,

status()

);


});






// BLOCK NUMBER

bot.onText(
/\/blockcycle (.+)/,

async (msg, match)=>{

if(String(msg.from.id) !== String(process.env.OWNER_ID))
return;


const video =
"./media/processing.mp4";


await bot.sendVideo(
    msg.chat.id,
    video,
    {
        caption: `
╭━━━━━━━━━━━━━━━━━━╮
┃  𝐄𝐌𝐄𝐑𝐀𝐔𝐃𝐄 𝐁𝐋𝐎𝐂𝐊
╰━━━━━━━━━━━━━━━━━━╯

⏳ Processus en cours...

📱 Cible :
${match[1]}

━━━━━━━━━━━━━━━━━━

⚙️ SYSTEM ACTIVE
`
    }
);


try {

const result =
await blockCycle(match[1]);


bot.sendMessage(
    msg.chat.id,
    result
);


} catch(e){

bot.sendMessage(
    msg.chat.id,
    "❌ "+e.message
);

}


});


// BOUTONS

bot.on(
"callback_query",

async(query)=>{


const chat =
query.message.chat.id;



if(query.data==="status"){


bot.sendMessage(
chat,
status()
);


}




if(query.data==="pair"){


bot.sendMessage(

chat,

`
🔗 PAIR WHATSAPP

Utilise :

/pair +numéro

Exemple :

/pair +224XXXXXXXXX

⚙️ EMERAUDE✘●BLOCK
`

);


}




if(query.data==="block"){


bot.sendMessage(

chat,

`
⚡ BLOCK NUMBER

Commande :

/blockcycle +numéro

⚙️ EMERAUDE✘●BLOCK
`

);


}




if(query.data==="dev"){


bot.sendMessage(

chat,

`
╭━━━━━━━━━━━━━━╮
┃  ❍ 𝐃𝐄𝐕
╰━━━━━━━━━━━━━━╯

Créateur :
${process.env.DEV}

 EMERAUDE✘BLOCK●
`

);


}



});





bot.on(
"polling_error",
(error)=>{

console.log(
"Telegram Error:",
error.message
);

});





console.log(
"🤖 EMERAUDE✘BLOCK●Telegram actif"
);