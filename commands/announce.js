const Commando = require('@iceprod/discord.js-commando');

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
		let message = context.message;
	}
};
