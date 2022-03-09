const Commando = require('@iceprod/discord.js-commando');
require('dotenv').config;

module.exports = class AnnounceCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'announce',
			group: 'main',
			memberName: 'announce',
			description: 'Announces a message to a set steam group',
			argsType: 'multiple',
			argsCount: 2,
			ownerOnly: true,
		});
	}

	async run(context, args) {
		const community = context.client.steamCommunity;

		community.postGroupAnnouncement(
			'103582791471501805',
			'Test',
			'Test announcement via api',
			(res) => {
				console.log(res);
			}
		);
		let message = context.message;
	}
};
