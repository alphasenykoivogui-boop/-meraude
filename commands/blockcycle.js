const fs = require("fs");
const { getSocket } = require("../whatsapp");

const logFile = "./logs/actions.log";


function createLogs(){

    if(!fs.existsSync("./logs")){
        fs.mkdirSync("./logs");
    }

}


function log(text){

    createLogs();

    fs.appendFileSync(
        logFile,
        `[${new Date().toLocaleString()}] ${text}\n`
    );

}


function formatNumber(number){

    const clean =
    String(number)
    .replace(/\D/g,"");


    return {
        clean,
        display:"+"+clean
    };

}



module.exports = async function blockCycle(number){


const sock = getSocket();


if(!sock){

throw new Error(
"❌ WhatsApp non connecté"
);

}



const {
clean,
display
}=formatNumber(number);



if(!clean){

throw new Error(
"❌ Numéro invalide"
);

}



const jid =
clean+"@s.whatsapp.net";



const cycles = 50;
const delay = 1500;


const startTime =
Date.now();



log(
`🚀 START BLOCK MANAGER PRO | ${display}`
);



let blockCount=0;
let unblockCount=0;



for(let i=1;i<=cycles;i++){


try{


await sock.updateBlockStatus(
jid,
"block"
);


blockCount++;


log(
`🚫 BLOCK ${i}/${cycles} | ${display}`
);



await new Promise(
r=>setTimeout(r,delay)
);



await sock.updateBlockStatus(
jid,
"unblock"
);



unblockCount++;


log(
`🔓 UNBLOCK ${i}/${cycles} | ${display}`
);



await new Promise(
r=>setTimeout(r,delay)
);



}catch(error){


log(
`⚠️ ERREUR ${display} : ${error.message}`
);


}



}



const duration =
((Date.now()-startTime)/1000)
.toFixed(2);



return `

╭━━━━━━━━━━━━━━━━━━╮
┃ 𝐄𝐌𝐄𝐑𝐀𝐔𝐃𝐄 𝐁𝐋𝐎𝐂𝐊 
╰━━━━━━━━━━━━━━━━━━╯

👤 Contact
➜ ${display}

📱 WhatsApp ID
➜ ${jid}

━━━━━━━━━━━━━━━━━━

🔁 Cycles exécutés
➜ ${cycles}

🚫 Blocages
➜ ${blockCount}

🔓 Déblocages
➜ ${unblockCount}

⏱️ Délai
➜ ${delay} ms

🕒 Durée
➜ ${duration}s

📅 Date
➜ ${new Date().toLocaleString()}

━━━━━━━━━━━━━━━━━━

🟢 Statut
➜ TERMINÉ
Plus qu’à lui signaler
━━━━━━━━━━━━━━━━━━
⚙️ EMERAUDE✘BLOCK●SYSTEM

`;

};