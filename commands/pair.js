const {
    pairWhatsApp
} = require("../whatsapp");



module.exports = async function pairCommand(
number,
send
){


const clean =
String(number)
.replace(/\D/g,"");



if(!clean){

return send(
"❌ Numéro invalide"
);

}



pairWhatsApp(

clean,

(text)=>{


send(`

╭━━━━━━━━━━━━━━━━━━╮
┃ ⚡ PAIR MANAGER X
╰━━━━━━━━━━━━━━━━━━╯

📱 Numéro
➜ +${clean}

━━━━━━━━━━━━━━━━━━

${text}

━━━━━━━━━━━━━━━━━━

⚙️ EMERAUDE✘BLOCK●SYSTEM

`);

}

);


};