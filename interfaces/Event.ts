import { Events } from "discord.js";

export default interface Event {
    event: Events,
    once?: boolean,
    callback: Function
}