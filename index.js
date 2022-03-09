require('dotenv').config();
const Commando = require('@iceprod/discord.js-commando');
const { Intents } = require('discord.js');

const client = new Commando.CommandoClient({
	owner: ['206805670874316801'],
	commandPrefix: config.prefix,
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', async () => {
	console.log(`${client.user.username} is online`);

	client.registry
		.registerGroups([['main', 'Main Commands']])
		.registerCommandsIn('commands');
});

client.on('messageCreate', async (message) => {
	if (message.channelId) {
	}
});

client.login(config.token);
