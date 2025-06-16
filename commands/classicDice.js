import { replyErrorToInteraction } from './../tools/errorManager.js';
import RSVP from './../tools/responseManager.js';

export const data = {
    "name": "dices",
    "description": "Launch the number of dices of a given number of faces.\r",
    "type": 1,
    "options": [
        {
            "name": "value",
            "type": 4,
            "description": "It is the dice value",
            "required": true,
            "min_value": 2,
        },
        {
            "name": "number",
            "type": 4,
            "description": "It is the dice number",
            "required": false,
            "min_value": 1,
            "max_value": 50,
        },
    ],
};
export async function execute(interaction) {
    try {
        await interaction.deferReply();
        let result = "" + interaction.options.get("value").value + " : " + (Math.floor(Math.random() * interaction.options.get("value").value) + 1);

        if (interaction.options.get("number")) {
            for (let i = 2; i <= interaction.options.get("number").value; i++) {
                result = result + " \t|\t " + interaction.options.get("value").value + " : ";
                result = result + (Math.floor(Math.random() * interaction.options.get("value").value) + 1);
            }
        }
        RSVP(interaction, "DiceOf", 1, result);
    }
    catch (err) { // We don't care if a error occurs here
        console.error(`An error was catch in execute - diceManagement => ${err}`)
        replyErrorToInteraction(interaction, "errorCommand", "", true);
    }
}