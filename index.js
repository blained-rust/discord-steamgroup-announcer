require('dotenv').config();
const path = require('path');
const ReadLine = require('readline');
const Commando = require('@iceprod/discord.js-commando');
const { Intents } = require('discord.js');
const SteamCommunity = require('steamcommunity');
let community = new SteamCommunity();

const client = new Commando.CommandoClient({
	owner: [process.env.OWNER_USER_ID],
	commandPrefix: process.env.PREFIX,
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const steamLogin = async () => {
	const rl = ReadLine.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	rl.question('Username: ', function (accountName) {
		rl.question('Password: ', async (password) => {
			await doLogin(accountName, password);
		});
	});

	const doLogin = async (
		accountName,
		password,
		authCode,
		twoFactorCode,
		captcha
	) => {
		await community.login(
			{
				accountName: accountName,
				password: password,
				authCode: authCode,
				twoFactorCode: twoFactorCode,
				captcha: captcha,
			},
			function (err, sessionID, cookies, steamguard) {
				if (err) {
					if (err.message == 'SteamGuardMobile') {
						rl.question('Steam Authenticator Code: ', function (code) {
							doLogin(accountName, password, null, code);
						});

						return;
					}

					if (err.message == 'SteamGuard') {
						console.log(
							'An email has been sent to your address at ' + err.emaildomain
						);
						rl.question('Steam Guard Code: ', function (code) {
							doLogin(accountName, password, code);
						});

						return;
					}

					if (err.message == 'CAPTCHA') {
						console.log(err.captchaurl);
						rl.question('CAPTCHA: ', function (captchaInput) {
							doLogin(
								accountName,
								password,
								authCode,
								twoFactorCode,
								captchaInput
							);
						});

						return;
					}

					console.log(err);
					process.exit();
				}
				console.log('Successfully Logged In');
			}
		);
	};
};

client.on('ready', async () => {
	console.log(`${client.user.username} is online`);

	await steamLogin();
	client.steamCommunity = community;
	client.registry
		.registerGroups([['main', 'Main Commands']])
		.registerDefaults()
		.registerCommandsIn(path.join(__dirname, 'commands'));
});

// client.on('messageCreate', async (message) => {
// 	if (message.channelId) {
// 	}
// });

client.login(process.env.BOT_TOKEN);
