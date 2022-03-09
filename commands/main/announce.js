const Commando = require('@iceprod/discord.js-commando');
require('dotenv').config;
const { embeds } = require('../../embed-handler');

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
			args: [
				{
					key: 'heading',
					prompt: 'What should your announcement heading be?',
					type: 'string',
				},
				{
					key: 'content',
					prompt: 'What should your announcement content be?',
					type: 'string',
				},
			],
		});
	}

	async run(context, { heading, content }) {
		const community = context.client.steamCommunity;
		let message = context.message;

		community.postGroupAnnouncement(
			process.env.STEAM_GROUP_ID,
			heading,
			content,
			(res) => {
				res ? console.log(res) : console.log('Success');
				console.log(res);
			}
		);

		message.channel.send({
			embeds: [
				embeds
					.success(`Heading:\n${heading}\nContent:\n${content}`)
					.setTitle('Announcement Posted'),
			],
		});
	}
};
