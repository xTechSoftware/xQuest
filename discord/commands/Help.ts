import { Client, EmbedBuilder, Interaction, PermissionFlagsBits } from "discord.js";
import Command from "../../interfaces/Command.js";

const Props:Command = {
    name: `Help`,
    command: `help`,
    description: `Lists all useful information.`,
    callback: ( client:Client, interaction:Interaction ) => {
        const embed = new EmbedBuilder()
        .setColor(`#2F3136`)
        .setTitle('Currently unavailable.')
        // @ts-ignore
        interaction.reply({ embeds: [embed] })
    }
}

export default Props;