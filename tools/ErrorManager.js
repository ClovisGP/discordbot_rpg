import getTranslation from './languageManager.js';

/**
 * Reply an error to an interaction
 * @param {{}} interaction The interaction object
 * @param {string} codeError The error code
 * @param {string} errorLog Optional, the text following the message
 * @param {boolean} followUp Optional, is the message a followup or not
 */
export async function replyErrorToInteraction(
    interaction,
    codeError,
    errorLog = "",
    followUp = false
) {
    try {
        console.error(`Error printed by replyErrorToInteraction: ${codeError} - ${getTranslation(interaction, codeError)}${errorLog.length > 0 ? " ".concat(errorLog) : ""}`);
        if (followUp) {
            interaction.followUp(getTranslation(interaction, codeError));
        } else {
            await interaction.reply(getTranslation(interaction, codeError));
            setTimeout(() => interaction.deleteReply(), 30000);
        }
    } catch (error) {
        console.error(`An error was catch in replyErrorToInteraction => ${error}`);
    }
}