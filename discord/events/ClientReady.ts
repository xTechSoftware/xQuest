import { ActivityType, Client, Events, REST, Routes } from "discord.js"
import { cache } from "../../index.js";

export default {
    event: Events.ClientReady,
    once: true,
    callback: async ( client:Client ) => {
        console.log(`${client.user.tag} is connected to the gateway.`)

        client.user.setPresence({ activities: [{ name: '/help | v0.1-Pre', type: ActivityType.Watching }], status: 'dnd' });

        const rest = new REST({ version: '10' }).setToken(client.token);

        (async () => {
            try {
                console.info(`Registering slash commands.`);

                const data = await rest.put(
                    Routes.applicationCommands(client.user.id),
                    { body: cache.slashCommands },
                );

                console.info(`Registered slash commands.`);
            } catch (error) {
                console.error(error);
            }
        })();
    }
}