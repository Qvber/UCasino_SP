const Discord = require('discord.js');
const prefix = "!!";

const client = new Discord.Client();
const { getMoney } = require('./db.js')
const { doSlot, slotsEmoji } = require('./slots.js')

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity('Made by Q&Q', { type: 'WATCHING' });
});

client.on('message', async message => {
	if (message.content.startsWith(prefix) && !message.author.bot && message.member.roles.cache.has('753687740570403045')) {
	const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();

	if (command == 'balance') {
			var username = message.author.id;
			console.log(username);
			let money = await getMoney(username);
			if (money == undefined) return message.reply(new Discord.MessageEmbed()
			.setColor('#e74c3c')
			.setTitle('Вы не зарегестрированы! :c')
			.setAuthor('БАЛАНС', 'https://cdn.discordapp.com/emojis/722090506821304450.png'));
			else return message.reply(new Discord.MessageEmbed()
			.setColor('#2ecc71')
			.setTitle('У вас ' + money.toString() + 'АР на счету.')
			.setAuthor('БАЛАНС', 'https://cdn.discordapp.com/emojis/722090493529423872.png'));
	}
	if (command == 'slot') {
		var summ = args[0];
		var username = message.author.id;
		let slots = await doSlot(username,summ);
		let msg = await message.reply(new Discord.MessageEmbed()
			.setColor('#e74c3c')
			.setTitle(`                | <a:anime:754015602640683181> | <a:anime:754015602640683181> | <a:anime:754015602640683181> |`)
			.setAuthor('СЛОТ-МАШИНА', 'https://i.pinimg.com/originals/fe/2a/14/fe2a145217e00b8a34ee78aeba1b06bb.jpg'));
		let money = await getMoney(username)
		console.log(slots)
		await setTimeout(() => {
			msg.edit(new Discord.MessageEmbed()
			.setColor('#e74c3c')
			.setTitle(`| <${slots.slots[0]}${slotsEmoji[slots.slots[0]]}> | <${slots.slots[1]}${slotsEmoji[slots.slots[1]]}> | <${slots.slots[2]}${slotsEmoji[slots.slots[2]]}> |`)
			.setDescription((slots.win == -1) ? `Вы проиграли! У вас осталось ${money}АР` : `Вы выиграли ${slots.summ}АР. Ваш баланс составляет: ${money}`)
			.setAuthor('СЛОТ-МАШИНА', 'https://i.pinimg.com/originals/fe/2a/14/fe2a145217e00b8a34ee78aeba1b06bb.jpg'))
		}, 3000)
		
		
	}

	} else if (message.content.startsWith(prefix) && !message.author.bot && !message.member.roles.cache.has('751163320387633162')) {
		return message.reply(new Discord.MessageEmbed()
		.setColor('#969C9F')
		.setTitle('Вы не зарегестрированы! :c')
		.setAuthor('NO PERMISSION', 'https://cdn.discordapp.com/emojis/722090506821304450.png'));
	}
});

// Login the bot
client.login("NzUyOTkyNDgzMTM0MTQ0NTky.X1fs5Q.jaXN92tr9o8NRgdEuDsoQI--388");
