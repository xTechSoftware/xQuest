import { Client, Events, Interaction, EmbedBuilder } from "discord.js";
import { cache, client } from "../../index.js";
import Event from "../../interfaces/Event.js";

const Props:Event = {
    event: Events.InteractionCreate,
    callback: async ( client:Client, interaction:Interaction ) => {
        if(!interaction.isChatInputCommand()) return;
        
        let { commandName } = interaction;
        let command;

        cache.commands.forEach(cmd => { if(cmd.command === commandName) { command = cmd } });

        if(!command) return;

        // TODO: Permission checking - done, ownerOnly checking.
        command.callback(client, interaction);
    }
}

export default Props;