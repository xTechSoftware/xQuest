console.log = ( message:string ) => {
    process.stdout.write(`\x1b[30m\x1b[47m LOG \x1b[0m ${message}\n`)
}

console.info = ( message:string ) => {
    process.stdout.write(`\x1b[30m\x1b[44m INFO \x1b[0m ${message}\n`)
}

console.warn = ( message:string ) => {
    process.stdout.write(`\x1b[30m\x1b[43m WARN \x1b[0m ${message}\n`)
}

console.error = ( message:string ) => {
    process.stdout.write(`\x1b[30m\x1b[41m ERROR \x1b[0m ${message}\n`)
}

import { Client, Events, GatewayIntentBits } from 'discord.js';
import { readdirSync } from 'fs';

let client = new Client({
    intents: [
        GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences,
        GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildBans
    ]
});

const eventFiles = readdirSync(`./discord/events/`).filter(file => file.endsWith(`.js`));

for(let event of eventFiles){
    import pull from `./discord/events/${event}`;
    if(!pull.callback || !pull.event){
        console.error(`${event.replace(`.js`, ``)} is missing a callback function.`)
    }else{
        client.on(pull.event, pull.callback.bind(null, client));
        console.info(`${event.replace(`.js`, ``)} has been registered.`)
    }
}

client.login(process.env["TOKEN"]);