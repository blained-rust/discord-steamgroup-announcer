const { MessageEmbed } = require('discord.js');

module.exports.embeds = {
	success: (text) => {
		const res = new MessageEmbed().setColor('GREEN').setDescription(text);
		return res;
	},
	failure: (text) => {
		const res = new MessageEmbed().setColor('RED').setDescription(text);
		return res;
	},
	warning: (text) => {
		const res = new MessageEmbed().setColor('ORANGE').setDescription(text);
		return res;
	},
};
