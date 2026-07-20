const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const pino = require("pino");


let sock = null;
let pairing = false;



async function createWhatsApp(number, send) {


    const {
        state,
        saveCreds
    } = await useMultiFileAuthState(
        "./session"
    );



    sock = makeWASocket({

        auth: state,

        logger: pino({
            level: "silent"
        }),

        browser: [
            "EMERAUDE✘●BLOCK",
            "Chrome",
            "1.0.0"
        ]

    });



    sock.ev.on(
        "creds.update",
        saveCreds
    );



    sock.ev.on(
        "connection.update",
        async(update)=>{


            const {
                connection,
                lastDisconnect
            } = update;



            if(connection === "open"){


                pairing = false;


                send(`
╭━━━━━━━━━━━━━━━━━━╮
┃ ⚡ PAIR MANAGER X
╰━━━━━━━━━━━━━━━━━━╯

✅ WhatsApp connecté

📱 Numéro :
+${number}

━━━━━━━━━━━━━━━━━━

⚙️ EMERAUDE✘●BLOCK SYSTEM
`);

            }



            if(connection === "close"){


                const reason =
                lastDisconnect
                ?.error
                ?.output
                ?.statusCode;



                if(reason !== DisconnectReason.loggedOut){

                    console.log(
                        "🔄 Reconnexion WhatsApp..."
                    );

                    createWhatsApp(
                        number,
                        send
                    );

                } else {


                    sock = null;


                    send(
                    "❌ Session WhatsApp déconnectée"
                    );

                }

            }


        }
    );



    if(
        !state.creds.registered &&
        !pairing
    ){


        pairing = true;


        setTimeout(
        async()=>{


            try{


                const code =
                await sock.requestPairingCode(
                    number
                );



                send(`

╭━━━━━━━━━━━━━━━━━━╮
┃ 🔗 PAIR MANAGER X
╰━━━━━━━━━━━━━━━━━━╯

📱 Numéro :
+${number}

🔑 Code :
${code}

━━━━━━━━━━━━━━━━━━

➡️ WhatsApp
➡️ Appareils connectés
➡️ Associer avec un numéro

━━━━━━━━━━━━━━━━━━

⚙️ EMERAUDE✘●BLOCK SYSTEM

`);



            }catch(error){


                send(
                "❌ Erreur Pair : "
                + error.message
                );


            }


        },3000);


    }


}




async function startWhatsApp(){


    await createWhatsApp(
        "",
        console.log
    );


}




function pairWhatsApp(number, send){


    return createWhatsApp(
        number,
        send
    );


}



function getSocket(){

    return sock;

}



module.exports = {

    startWhatsApp,
    pairWhatsApp,
    getSocket

};