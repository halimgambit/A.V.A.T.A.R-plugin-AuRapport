import fs from 'fs/promises';

export async function init () {
    await Avatar.lang.addPluginPak('AuRapport');
}

export async function action(data, callback) {

    try {

        const Locale = await Avatar.lang.getPak('AuRapport', data.language);

        const tblActions = {
            rapport: () => rapport(data.client, Locale)
        };

		info("AuRapport:", data.action.command, Locale.get("plugin.from"), data.client);

        if (tblActions[data.action.command]) {
            await tblActions[data.action.command]();
        }

    } catch (err) {
        if (data.client) Avatar.Speech.end(data.client);
        error(err.message);
    }

    callback();
}


const rapport = async (client, Locale) => {

	try {

		const dir = './resources/app/core/plugins';
		const files = await fs.readdir(dir);


		Avatar.speak(Locale.get(["speech.pluginCount", files.length]), client);

	} catch (err) {
		error(`Rapport Error: ${err.message}`);
		Avatar.speak(Locale.get("speech.errorRead"), client, () => Avatar.Speech.end(client));
	}
};

