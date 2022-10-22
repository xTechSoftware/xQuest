import { Client, Events } from "discord.js"

export default {
    event: Events.ClientReady,
    once: true,
    callback: async ( client:Client ) => {
        console.log(`${client.user.tag} is connected to the gateway.`)
    }
}