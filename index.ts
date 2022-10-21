import { Client, Events, GatewayIntentBits } from 'discord.js';

let client = new Client({
    intents: [GatewayIntentBits.Guilds]
});