import { Client, Interaction, PermissionFlagsBits } from "discord.js";
import Command from "../../interfaces/Command.js";

const Props:Command = {
    name: `Help`,
    command: `help`,
    description: `Lists all useful information.`,
    callback: ( client:Client, interaction:Interaction ) => {

    }
}

export default Props;