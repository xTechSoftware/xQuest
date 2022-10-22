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

const cache = {
    commands: new Map(),
};

let client = new Client({
    intents: [
        GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences,
        GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildBans
    ]
});

readdirSync(`./discord/events/`).filter(file => file.endsWith(`.js`)).forEach(async file => {
    let pull = (await import(`./discord/events/${file}`)).default;
    if(pull.callback && pull.event){
        client.on(pull.event, pull.callback.bind(null, client));
        console.info(`${file.replace(`.js`, ``)} has been registered as a \x1b[30m\x1b[42m EVENT \x1b[0m.`)
    }else{
        console.error(`${file.replace(`.js`, ``)} is missing a value.`)
    }
});

readdirSync(`./discord/commands/`).filter(file => file.endsWith(`.js`)).forEach(async file => {
    let pull = (await import(`./discord/commands/${file}`)).default;
    if(pull.callback && pull.name){
        cache.commands.set(pull.name, pull);
        console.info(`${file.replace(`.js`, ``)} has been registered as a \x1b[30m\x1b[46m COMMAND \x1b[0m.`)
    }else{
        console.error(`${file.replace(`.js`, ``)} is missing a value.`)
    }
});

client.login(process.env["TOKEN"]);

export { cache, client };