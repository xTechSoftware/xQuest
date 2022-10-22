import { PermissionFlagsBits } from "discord.js";

export default interface Command {
    name: string,
    command: string,
    description: string,
    permissions?: Array<typeof PermissionFlagsBits>,
    ownerOnly?: boolean,
    ephemeral?: boolean,
    callback: Function
}