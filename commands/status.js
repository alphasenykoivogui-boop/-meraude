const {
    getSocket
} = require("../whatsapp");


module.exports = function status(){


const sock =
getSocket();



if(sock){

return `
╭━━━━━━━━━━━━━━━━━━╮
┃ 📱 STATUS BOT
╰━━━━━━━━━━━━━━━━━━╯

WhatsApp
➜ ✅ Connecté

Telegram
➜ ✅ Actif

━━━━━━━━━━━━━━━━━━

⚙️ EMERAUDE✘●BLOCK SYSTEM
`;

}



return `
╭━━━━━━━━━━━━━━━━━━╮
┃ 📱 STATUS BOT
╰━━━━━━━━━━━━━━━━━━╯

WhatsApp
➜ ❌ Non connecté

Telegram
➜ ✅ Actif

━━━━━━━━━━━━━━━━━━

⚙️ EMERAUDE✘●BLOCK SYSTEM
`;

};