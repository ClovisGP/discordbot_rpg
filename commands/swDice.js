import { replyErrorToInteraction } from './../tools/errorManager.js';
import RSVP from './../tools/responseManager.js';
import getTranslation from "./../tools/languageManager.js";

export const data = {
    "name": "dices_star-wars",
    "description": "Interaction used to launch some dice to the RPG Star wars, At the end of the galaxy\r",
    "type": 1,
    "options": [
        {
            "name": "green",
            "type": 4,
            "description": "It is the number of green dices",
            "required": true,
        },
        {
            "name": "purple",
            "type": 4,
            "description": "It is the number of purple dices",
            "required": true,
        },
        {
            "name": "yellow",
            "type": 4,
            "description": "It is the number of yellow dices",
            "required": false,
        },
        {
            "name": "red",
            "type": 4,
            "description": "It is the number of red dices",
            "required": false,
        },
        {
            "name": "blue",
            "type": 4,
            "description": "It is the number of blue dices",
            "required": false,
        },
        {
            "name": "black",
            "type": 4,
            "description": "It is the number of black dices",
            "required": false,
        },
    ],
};

export async function execute(interaction) {
    try {
        await interaction.deferReply();
        let success = 0
        let failures = 0;
        let advantages = 0;
        let threats = 0;
        let triumphs = 0;
        let despairs = 0;

        for (let index = 0; index < (interaction.options.getInteger("green") ?? 0); index++) {
            switch (Math.floor(Math.random() * 8) + 1) {
                case 2:
                case 3:
                    success++;
                    break;
                case 4:
                    success = success + 2;
                    break;
                case 5:
                case 6:
                    advantages++;
                    break;
                case 7:
                    success++;
                    advantages++;
                    break;
                case 8:
                    advantages = advantages + 2;
                    break;
                default:
                    break;
            }
        }
        for (let index = 0; index < (interaction.options.getInteger("purple") ?? 0); index++) {
            switch (Math.floor(Math.random() * 8) + 1) {
                case 2:
                case 3:
                    failures++;
                    break;
                case 4:
                    failures = failures + 2;
                    break;
                case 5:
                case 6:
                    threats++;
                    break;
                case 7:
                    threats = threats + 2;
                    break;
                case 8:
                    failures++;
                    threats++;
                    break;
                default:
                    break;
            }
        }
        for (let index = 0; index < (interaction.options.getInteger("yellow") ?? 0); index++) {
            switch (Math.floor(Math.random() * 12) + 1) {
                case 2:
                case 3:
                    success++;
                    break;
                case 4:
                case 5:
                    success = success + 2;
                    break;
                case 6:
                    advantages++;
                    break;
                case 7:
                case 8:
                case 9:
                    success++;
                    advantages++;
                    break;
                case 10:
                case 11:
                    advantages = advantages + 2;
                    break;
                case 12:
                    triumphs++;
                    break;
                default:
                    break;
            }
        }
        for (let index = 0; index < (interaction.options.getInteger("red") ?? 0); index++) {
            switch (Math.floor(Math.random() * 12) + 1) {
                case 2:
                case 3:
                    failures++;
                    break;
                case 4:
                case 5:
                    failures = failures + 2;
                    break;
                case 6:
                case 7:
                    threats++;
                    break;
                case 8:
                case 9:
                    failures++;
                    threats++;
                    break;
                case 10:
                case 11:
                    threats = threats + 2;
                    break;
                case 12:
                    despairs++;
                    break;
                default:
                    break;
            }
        }
        for (let index = 0; index < (interaction.options.getInteger("blue") ?? 0); index++) {
            switch (Math.floor(Math.random() * 6) + 1) {
                case 3:
                    advantages = advantages + 2;
                    break;
                case 4:
                    advantages++;
                    break;
                case 5:
                    success++;
                    advantages++;
                    break;
                case 6:
                    advantages++;
                    break;
                default:
                    break;
            }
        }
        for (let index = 0; index < (interaction.options.getInteger("red") ?? 0); index++) {
            switch (Math.floor(Math.random() * 6) + 1) {
                case 3:
                case 4:
                    failures++;
                    break;
                case 5:
                case 6:
                    threats++;
                    break;
                default:
                    break;
            }
        }

        RSVP(interaction, "diceResult", 1, 
            `\n\t${success
            } ${getTranslation(interaction, "success")
            }\n\t${advantages
            } ${getTranslation(interaction, "advantages")
            }\n\t${triumphs} ${getTranslation(interaction, "triumphs")
            }\n\n\t${failures
            } ${getTranslation(interaction, "failures")
            }\n\t${threats
            } ${getTranslation(interaction, "threats")
            }\n\t${despairs
            } ${getTranslation(interaction, "despairs")
            }`);
    }

    catch (err) { // We don't care if a error occurs here
        console.error(`An error was catch in execute - swDice => ${err}`)
        replyErrorToInteraction(interaction, "errorCommand", "", true);
    }
}