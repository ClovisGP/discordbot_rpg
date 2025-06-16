import { REST } from '@discordjs/rest';
import { Collection, Routes } from 'discord.js';
import fs from 'fs';
import path from 'path';


const __dirname = path.resolve();
const commandsPath = path.join(__dirname, './commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

const commands = [];

/**
 * Initializes the commands on the server
 * @param {{}} bot  The bot object
 * @param {number} guildId The Guild or Server 's ID
 */
export async function initCommands(bot, guildId) {
    try {
        await rest.put(Routes.applicationGuildCommands(process.env.APP_ID, guildId), { body: [] }); // The the old command
        bot.commands = new Collection();
        for (const file of commandFiles) {
            const filePath = `file://${path.join(commandsPath, file)}`;
            const command = await import(filePath);

            bot.commands.set(command.data.name, command);
            commands.push(command.data);
            console.log(`Command file loaded => ${file}`)
        }
        await rest.put(Routes.applicationGuildCommands(process.env.APP_ID, guildId), { body: commands });
        console.log('Successfully registered application commands.');
    } catch (error) {
        console.error(`An error was catch in initCommands => ${error}`);
        throw Error(`An error was catch in initCommands`)
    }
}