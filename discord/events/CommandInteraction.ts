import { Client, Events, Interaction, EmbedBuilder } from "discord.js";
import { cache, client } from "../../index.js";
import Event from "../../interfaces/Event.js";

const Props:Event = {
    event: Events.InteractionCreate,
    callback: async ( interaction:Interaction ) => {
        if(!interaction.isChatInputCommand()) return;

        let { commandName } = interaction;
        let command;

        cache.commands.forEach(cmd => { if(cmd.command === commandName) { command = cmd } });

        if(!command) return;

        interaction.deferReply({ ephemeral: command.ephemeral });

        // @ts-ignore - Ignoring because of adding new properties to object.
        interaction.send = (message) => {
            if(typeof message === typeof EmbedBuilder){
                interaction.editReply({ embeds: [message] });
            }else{
                interaction.editReply(message);
            }
        }

        // TODO: Permission checking, ownerOnly checking.
        command.callback(client, interaction);
    }
}

export default Props;