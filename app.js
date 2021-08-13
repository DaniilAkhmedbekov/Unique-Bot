console.log('')
console.log('-------------------------------')
console.log('  Скрипт MineBot запущен.')
console.log('  Разработчик: Игорь Левин')
console.log('  vk.com/id585764343')

console.log('-------------------------------')
console.log('')


const {VK, Keyboard} = require('vk-io');
const vk = new VK();
const commands = [];
const request = require('prequest');

const lives = [
	{
		id: 1,
		lives: 50000,
		name: `Легко`
	},
	{
		id: 2,
		lives: 150000,
		name: `Сложно`
	},
	{
		id: 3,
		lives: 500000,
		name: `Профи`
	},
	{
		id: 4,
		lives: 1000000,
		name: `Хардкор`
	}
];

const guns = [
	{
		id: 0,
		damage: 0,
		levelcost: 0,
		cost: 0,
		leveldamage: 0,
		name: `Не куплено`
	},
	{
		id: 1,
		damage: 1,
		levelcost: 50000000,
		cost: 10000,
		leveldamage: 1,
		name: `Меч`
	},
	{
		id: 2,
		damage: 5,
		levelcost: 100000000,
		cost: 100000,
		leveldamage: 5,
		name: `Катана`
	},
	{
		id: 3,
		damage: 10,
		levelcost: 150000000,
		cost: 500000,
		leveldamage: 10,
		name: `Нунчаки`
	}
];

const mines = [
	{
		id: 1,
		cost: 20000000,
		earn: 250000
	},
	{
		id: 2,
		cost: 50000000,
		earn: 1000000
	},
	{
		id: 3,
		cost: 100000000,
		earn: 10000000
	}
];

const locate = [
	{
		id: 1,
		name: 'Земля'
	},
	{
		id: 2,
		name: 'Пустыня'
	},
	{
		id: 3,
		name: 'Тундра'
	},
	{
		id: 4,
		name: 'Пещера'
	},
	{
		id: 5,
		name: 'Эверест'
	}
];

const kirka = [
	{
		id: 1,
		name: 'Деревянная',
		earn: 1
	},
	{
		id: 2,
		name: 'Каменная',
		earn: 2
	},
	{
		id: 3,
		name: 'Железная',
		earn: 3
	},
	{
		id: 4,
		name: 'Бронзовая',
		earn: 6
	},
	{
		id: 5,
		name: 'Золотая',
		earn: 12
	},
	{
		id: 6,
		name: 'Платиновая',
		earn: 24
	},
	{
		id: 7,
		name: 'Алмазная',
		earn: 35
	},
	{
		id: 8,
		name: 'Редкая',
		earn: 60
	},
	{
		id: 9,
		name: 'Эпическая',
		earn: 80
	},
	{
		id: 10,
		name: 'Легендарная',
		earn: 100
	},
	{
		id: 11,
		name: 'Мифическая',
		earn: 150
	},
	{
		id: 12,
		name: 'Божественная',
		earn: 200
	},
	{
		id: 13,
		name: 'Огненная',
		earn: 250
	},
	{
		id: 14,
		name: 'Усиленная',
		earn: 300
	}
];

const adm = [
	{
		name: 'VIP',
		id: 1
	},
	{
		name: 'Администратор',
		id: 2
	},
	{
		name: 'Администратор',
		id: 3
	},
	{
		name: 'Администратор',
		id: 4
	},
	{
		name: 'Кодер',
		id: 5
	}
];

const utils = {
	sp: (int) => {
		int = int.toString();
		return int.split('').reverse().join('').match(/[0-9]{1,3}/g).join('.').split('').reverse().join('');
	},
	rn: (int, fixed) => {
		if (int === null) return null;
		if (int === 0) return '0';
		fixed = (!fixed || fixed < 0) ? 0 : fixed;
		let b = (int).toPrecision(2).split('e'),
			k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3),
			c = k < 1 ? int.toFixed(0 + fixed) : (int / Math.pow(10, k * 3) ).toFixed(1 + fixed),
			d = c < 0 ? c : Math.abs(c),
			e = d + ['', 'тыс', 'млн', 'млрд', 'трлн', 'квдр'][k];

			e = e.replace(/e/g, '');
			e = e.replace(/\+/g, '');
			e = e.replace(/Infinity/g, 'ДОХЕРА');

		return e;
	},
	gi: (int) => {
		int = int.toString();

		let text = ``;
		for (let i = 0; i < int.length; i++)
		{
			text += `${int[i]}&#8419;`;
		}

		return text;
	},
	decl: (n, titles) => { return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2] },
	random: (x, y) => {
		return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
	},
	pick: (array) => {
		return array[utils.random(array.length - 1)];
	}
}

let smileerror = utils.pick([`😒`, `😯`, `😔`, `🤔`]);
let smilesuccess = utils.pick([`😯`, `🙂`, `🤑`, `☺`]);

let users = require('./base/users.json');
let config = require('./settings/config.js');
let buttons = [];

//------------------------------------------------------------------------------------\\
 	var uptime = { sec: 0, min: 0, hours: 0, days: 0 }
 //------------------------------------------------------------------------------------\\
	setInterval(() => {
		uptime.sec++;
		if (uptime.sec == 60) { uptime.sec = 0; uptime.min += 1; }
		if (uptime.min == 60) { uptime.min = 0; uptime.hours += 1; }
		if (uptime.hours == 24) { uptime.hours = 0; uptime.days += 1; }
	}, 1000);
	
setInterval(async () => {
	users.map(user => {
		if(user.mine) {
			let mine = mines[user.mine - 1];
			var a = user.minelvl * mine.earn;
			user.min += a;
		}
	});
}, 3600000);

setInterval(async () => {
	users.map(user => {
		if(user.donday) {
			user.donday -= 1;
		}
	});
}, 86400000);

setInterval(async () => {
	await saveAll();
	console.log('saved');
}, 10000);

function clearTemp()
{
	users.map(user => {
		
	});
}

clearTemp();

async function saveAll()
{
	require('fs').writeFileSync('./base/users.json', JSON.stringify(users, null, '\t'));
	return true;
}

vk.setOptions({ token: '288eb64a06beaa9134a86b97e586961e903ea407f6904ec21ffb6cf109aed5646ccc54ed295693a1f3787', pollingGroupId: 192780523 });
const { updates, snippets } = vk;

updates.startPolling();
updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[club192780523\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club192780523\|(.*)\]/ig, '').trim();

	if(!users.find(x=> x.id === message.senderId))
	{
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();

		users.push({
			id: message.senderId,
			uid: users.length,
			mention: true,
			tag: user_info.first_name,
			reg: 0,
			bosskill: 0,
			block_top: false,
			dificulty: 0,
			damage: 0,
			bosslive: 0,
			gun: 0,
			gunlevel: 0,
			gunlevelcost: 0,
			report_o: 0,
			donate: 0,
			donday: 0,
			viptime: false,
			case4: 0,
			deflocate5: 0,
			resurse5: 0,
			terrastone: 0,
			kristall: 0,
			diamondsnow: 0,
			defkirka13: 0,
			defkirka14: 0,
			winkirka13: 0,
			winkirka14: 0,
			case2: 0,
			case3: 0,
			minecost: 0,
			minelvl: 0,
			min: 0,
			mine: 0,
			defkirka9: 0,
			defkirka10: 0,
			defkirka11: 0,
			defkirka12: 0,
			winkirka9: 0,
			winkirka10: 0,
			winkirka11: 0,
			winkirka12: 0,
			resurse4: 0,
			topaz: 0,
			emerald: 0,
			diamond: 0,
			case1: 0,
			winkirka8: 0,
			winkirka9: 0,
			winkirka10: 0,
			winkirka11: 0,
			defkirka8: 0,
			defkirka9: 0,
			defkirka10: 0,
			defkirka11: 0,
			titan: 0,
			qwar: 0,
			magniy: 0,
			resurse1: 0,
			resurse2: 0,
			resurse3: 0,
			deflocate3: 0,
			deflocate2: 0,
			sapfir: 0,
			whitestone: 0,
			sand: 0,
			winkirka2: 0,
			winkirka3: 0,
			winkirka4: 0,
			winkirka5: 0,
			winkirka6: 0,
			winkirka7: 0,
			defkirka1: 0,
			defkirka2: 0,
			defkirka3: 0,
			defkirka4: 0,
			defkirka5: 0,
			defkirka6: 0,
			defkirka7: 0,
			adm: 0,
			resurse: 0,
			locate: 1,
			balance: 0,
			coal: 0,
			stone: 0,
			kirka: 1,
			terra: 0,
			marriage: {
				requests: []
			}
		});
	}

	message.user = users.find(x=> x.id === message.senderId);
	if(message.user.ban) return;

	const bot = (text, params) => {
		return message.send(`${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, ${text}`, params);
	}
	if(message.user.reg == 0) {
vk.api.messages.send({ chat_id: 5, forward_messages: message.id, message: ` [id${message.user.id}|${message.user.tag}] id: ${message.user.uid} \n[🔈] +1 Игрок \n` 
})
bot(`я вижу ты новенький! Рад познакомится, я отправил тебе клавиатуру.`,
{
	keyboard:JSON.stringify( 
		{ 
		"one_time": false, 
		"buttons": [ 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "⛏ Добыть" 
		}, 
		"color": "primary" 
		}], 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "👤 Профиль" 
		}, 
		"color": "default" 
		},
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🛒 Магазин" 
		}, 
		"color": "default" 
		}],
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🏆 Топ" 
		}, 
		"color": "default" 
		},
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "👊 Босс" 
		}, 
		"color": "negative" 
		}],
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "Далее" 
		}, 
		"color": "default"
		}]
	] 
	}) 
	}); 
	}
	message.user.reg = 1;

	const command = commands.find(x=> x[0].test(message.text));
	if(!command) return;

	if(message.user.exp >= 10)
	{
		message.user.exp -= 10;
		message.user.level += 1;
	}
	if(message.user.donate == 1) 
	{
		if(message.user.viptime == false) {
			if(!message.user.donday) {
				message.user.donate = 0;
				return message.send(`Действие VIP закончено ${smileerror}`); 
			}
		}
	}
	
	message.user = users.find(x=> x.id === message.senderId); 

	message.args = message.text.match(command[0]);
	await command[1](message, bot);

	console.log(`Executed: ${message.text}`)
});

const cmd = {
	hear: (p, f) => {
		commands.push([p, f]);
	}
}

cmd.hear(/^(?:!)\s([^]+)$/i, async (message, bot) => {
	if(message.user.adm < 5) return;

	try {
		const result = eval(message.args[1]);

		if(typeof(result) === 'string')
		{
			return bot(`string: ${result}`);
		} else if(typeof(result) === 'number')
		{
			return bot(`number: ${result}`);
		} else {
			return bot(`${typeof(result)}: ${JSON.stringify(result, null, '&#12288;\t')}`);
		}
	} catch (e) {
		console.error(e);
		return bot(`ошибка:
		${e.toString()}`);
	}
});

cmd.hear(/^(?:назад|меню)$/i, async (message) => {
	return message.send(`Вы вернулись в главное меню.`,
{
	keyboard:JSON.stringify( 
		{ 
		"one_time": false, 
		"buttons": [ 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "⛏ Добыть" 
		}, 
		"color": "primary" 
		}], 
		[{
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "👤 Профиль" 
		}, 
		"color": "default" 
		},
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🛒 Магазин" 
		}, 
		"color": "default" 
		}],
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🏆 Топ" 
		}, 
		"color": "default" 
		},
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "👊 Босс" 
		}, 
		"color": "negative" 
		}],
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "Далее" 
		}, 
		"color": "default" 
		}]
	] 
	}) 
	})
});

cmd.hear(/^(?:👤 Профиль|профиль)$/i, async (message, bot) => {
	let text = ``;
	text += `🆔 ID: ${message.user.uid}\n`;
	if((message.user.donate)&(message.user.viptime == false)) text += `🎩 Донат: ${adm[message.user.donate - 1].name} (Время: ${message.user.donday}д)\n`;
	if((message.user.donate)&(message.user.viptime == true)) text += `🎩 Донат: ${adm[message.user.donate - 1].name} (Время: Навсегда)\n`;
	text += `💰 Денег: ${message.user.balance}$\n`;
	text += `🏝 Локация: ${locate[message.user.locate - 1].name}\n`;
	if(message.user.kirka) text += `⛏ Кирка: ${kirka[message.user.kirka - 1].name}\n`;
	if(!message.user.kirka) text += `⛏ Кирка: Не надета\n`;
	return bot(`Твой профиль:\n${text}`);
});

cmd.hear(/^(?:далее)$/i, async (message, bot) => {
	return bot(`.`,
{
	keyboard:JSON.stringify( 
		{ 
		"one_time": false, 
		"buttons": [ 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "🎒 Инвентарь" 
		}, 
		"color": "primary" 
		}], 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "⛏ Продать ресурсы" 
		}, 
		"color": "primary" 
		},
		{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "📦 Кейсы" 
		}, 
		"color": "primary"
		}],
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "⚒ Шахта" 
		}, 
		"color": "primary"
		}],		
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "Назад" 
		}, 
		"color": "default" 
		}]
	] 
	}) 
	});
});

cmd.hear(/^(?:⛏ Добыть|добыть)$/i, async (message, bot) => {
	if(!message.user.kirka) return bot(`У вас нет активных кирок, наденьте: "Надеть кирку [1-14]".`);
	if(message.user.donate < 1) var b = kirka[message.user.kirka - 1].earn;
	if(message.user.donate >= 1) var b = Math.floor(kirka[message.user.kirka - 1].earn * 1.10);
	if(message.user.locate == 1) {
		var a = utils.random(1,100);
		if((a >= 1)&(a < 21)) {
			message.user.stone += b;
			message.user.resurse1 += b; 
			return message.send(`+${b} ${utils.decl(b, ['Камень', 'Камня', 'Камней'])}.`);
		}
		if((a >= 21)&(a < 51)) {
			message.user.coal += b;
			message.user.resurse1 += b;
			return message.send(`+${b} ${utils.decl(b, ['Уголь', 'Угля', 'Угля'])}.`);
		}
		if((a >= 51)&(a < 101)) {
			message.user.terra += b;
			message.user.resurse1 += b; 
			return message.send(`+${b} ${utils.decl(b, ['Земля', 'Земли', 'Земли'])}.`);
		}
	}
	if(message.user.locate == 2) {
		var a = utils.random(1,100);
		if((a >= 1)&(a < 21)) {
			message.user.sapfir += b;
			message.user.resurse2 += b; 
			return message.send(`+${b} ${utils.decl(b, ['Сапфир', 'Сапфира', 'Сапфиров'])}.`);
		}
		if((a >= 21)&(a < 51)) {
			message.user.whitestone += b;
			message.user.resurse2 += b;
			return message.send(`+${b} ${utils.decl(b, ['Белый камень', 'Белого камня', 'Белых камней'])}.`);
		}
		if((a >= 51)&(a < 101)) {
			message.user.sand += b;
			message.user.resurse2 += b; 
			return message.send(`+${b} ${utils.decl(b, ['Песок', 'Песка', 'Песка'])}.`);
		}
	}
	if(message.user.locate == 3) {
		var a = utils.random(1,100);
		if((a >= 1)&(a < 21)) {
			message.user.magniy += b;
			message.user.resurse3 += b; 
			return message.send(`+${b} ${utils.decl(b, ['Магний', 'Магния', 'Магния'])}.`);
		}
		if((a >= 21)&(a < 51)) {
			message.user.qwar += b;
			message.user.resurse3 += b;
			return message.send(`+${b} ${utils.decl(b, ['Кварц', 'Кварца', 'Кварца'])}.`);
		}
		if((a >= 51)&(a < 101)) {
			message.user.titan += b;
			message.user.resurse3 += b; 
			return message.send(`+${b} ${utils.decl(b, ['Титан', 'Титана', 'Титана'])}.`);
		}
	}
	if(message.user.locate == 4) {
		var a = utils.random(1,100);
		if((a >= 1)&(a < 21)) {
			message.user.diamond += b;
			message.user.resurse4 += b; 
			return message.send(`+${b} ${utils.decl(b, ['Алмаз', 'Алмаза', 'Алмазов'])}.`);
		}
		if((a >= 21)&(a < 51)) {
			message.user.emerald += b;
			message.user.resurse4 += b;
			return message.send(`+${b} ${utils.decl(b, ['Изумруд', 'Изумруда', 'Изумрудов'])}.`);
		}
		if((a >= 51)&(a < 101)) {
			message.user.topaz += b;
			message.user.resurse4 += b; 
			return message.send(`+${b} ${utils.decl(b, ['Топаз', 'Топаза', 'Топаза'])}.`);
		}
	}
	if(message.user.locate == 5) {
		var a = utils.random(1,100);
		if((a >= 1)&(a < 21)) {
			message.user.diamondsnow += b;
			message.user.resurse5 += b; 
			return message.send(`+${b} ${utils.decl(b, ['Алмазная снежинка', 'Алмазные снежинки', 'Алмазных снежинок'])}.`);
		}
		if((a >= 21)&(a < 51)) {
			message.user.kristall += b;
			message.user.resurse5 += b;
			return message.send(`+${b} ${utils.decl(b, ['Кристалл', 'Кристалла', 'Кристаллов'])}.`);
		}
		if((a >= 51)&(a < 101)) {
			message.user.terrastone += b;
			message.user.resurse5 += b; 
			return message.send(`+${b} ${utils.decl(b, ['Горный камень', 'Горного камня', 'Горных камней'])}.`);
		}
	}
});

cmd.hear(/^(?:🎒 Инвентарь|инвентарь)$/i, async (message, bot) => {
	if(message.user.locate == 1) {
		return bot(`Ваш инвентарь:
	- Земля:
	Земля (${message.user.terra})
	Уголь (${message.user.coal})
	Камень (${message.user.stone})`);
	}
	if(message.user.locate == 2) {
		return bot(`Ваш инвентарь:
	- Пустыня:
	Песок (${message.user.sand})
	Белый камень (${message.user.whitestone})
	Сапфир (${message.user.sapfir})`);
	}
	if(message.user.locate == 3) {
		return bot(`Ваш инвентарь:
	- Тундра:
	Титан (${message.user.titan})
	Кварц (${message.user.qwar})
	Магний (${message.user.magniy})`);
	}
	if(message.user.locate == 4) {
		return bot(`Ваш инвентарь:
	- Пещера:
	Топаз (${message.user.topaz})
	Изумруд (${message.user.emerald})
	Алмаз (${message.user.diamond})`);
	}
	if(message.user.locate == 5) {
		return bot(`Ваш инвентарь:
	- Эверест:
	Горный камень (${message.user.terrastone})
	Кристалл (${message.user.kristall})
	Алмазная снежинка (${message.user.diamondsnow})`);
	}
});

cmd.hear(/^(?:⛏ Продать ресурсы|продать ресурсы)$/i, async (message, bot) => {
	if(message.user.donate < 1) {
		if(message.user.locate == 1) {
			if(!message.user.resurse1) return bot(`У вас нет ресурсов!`);
			var a = message.user.terra * 10;
			var b = message.user.coal * 20;
			var c = message.user.stone * 30;
			message.user.terra = 0;
			message.user.coal = 0;
			message.user.stone = 0;
			message.user.resurse1 = 0; 
		}
		if(message.user.locate == 2) {
			if(!message.user.resurse2) return bot(`У вас нет ресурсов!`);
			var a = message.user.sand * 100;
			var b = message.user.whitestone * 110;
			var c = message.user.sapfir * 200;
			message.user.sand = 0;
			message.user.whitestone = 0;
			message.user.sapfir = 0;
			message.user.resurse2 = 0; 
		}
		if(message.user.locate == 3) {
			if(!message.user.resurse3) return bot(`У вас нет ресурсов!`);
			var a = message.user.titan * 500;
			var b = message.user.qwar * 1000;
			var c = message.user.magniy * 1500;
			message.user.titan = 0;
			message.user.qwar = 0;
			message.user.magniy = 0;
			message.user.resurse3 = 0; 
		}
		if(message.user.locate == 4) {
			if(!message.user.resurse4) return bot(`У вас нет ресурсов!`);
			var a = message.user.topaz * 2000;
			var b = message.user.emerald * 2500;
			var c = message.user.diamond * 3000;
			message.user.topaz = 0;
			message.user.emerald = 0;
			message.user.diamond = 0;
			message.user.resurse4 = 0; 
		}
		if(message.user.locate == 5) {
			if(!message.user.resurse5) return bot(`У вас нет ресурсов!`);
			var a = message.user.terrastone * 3500;
			var b = message.user.kristall * 4000;
			var c = message.user.diamondsnow * 4500;
			message.user.terrastone = 0;
			message.user.kristall = 0;
			message.user.diamondsnow = 0;
			message.user.resurse5 = 0; 
		}
		var sell = a + b + c;
		message.user.balance += sell;
		return bot(`Все ресурсы успешно проданы!
		💰 Получено: ${sell}$`);
	}
	if(message.user.donate >= 1) {
		if(message.user.locate == 1) {
			if(!message.user.resurse1) return bot(`У вас нет ресурсов!`);
			var a = Math.floor(message.user.terra * 10 * 1.20);
			var b = Math.floor(message.user.coal * 20 * 1.20);
			var c = Math.floor(message.user.stone * 30 * 1.20);
			message.user.terra = 0;
			message.user.coal = 0;
			message.user.stone = 0;
			message.user.resurse1 = 0; 
		}
		if(message.user.locate == 2) {
			if(!message.user.resurse2) return bot(`У вас нет ресурсов!`);
			var a = Math.floor(message.user.sand * 100 * 1.20);
			var b = Math.floor(message.user.whitestone * 110 * 1.20);
			var c = Math.floor(message.user.sapfir * 200 * 1.20);
			message.user.sand = 0;
			message.user.whitestone = 0;
			message.user.sapfir = 0;
			message.user.resurse2 = 0; 
		}
		if(message.user.locate == 3) {
			if(!message.user.resurse3) return bot(`У вас нет ресурсов!`);
			var a = Math.floor(message.user.titan * 500 * 1.20);
			var b = Math.floor(message.user.qwar * 1000 * 1.20);
			var c = Math.floor(message.user.magniy * 1500 * 1.20);
			message.user.titan = 0;
			message.user.qwar = 0;
			message.user.magniy = 0;
			message.user.resurse3 = 0; 
		}
		if(message.user.locate == 4) {
			if(!message.user.resurse4) return bot(`У вас нет ресурсов!`);
			var a = Math.floor(message.user.topaz * 2000 * 1.20);
			var b = Math.floor(message.user.emerald * 2500 * 1.20);
			var c = Math.floor(message.user.diamond * 3000 * 1.20);
			message.user.topaz = 0;
			message.user.emerald = 0;
			message.user.diamond = 0;
			message.user.resurse4 = 0; 
		}
		if(message.user.locate == 5) {
			if(!message.user.resurse5) return bot(`У вас нет ресурсов!`);
			var a = Math.floor(message.user.terrastone * 3500 * 1.20);
			var b = Math.floor(message.user.kristall * 4000 * 1.20);
			var c = Math.floor(message.user.diamondsnow * 4500 * 1.20);
			message.user.terrastone = 0;
			message.user.kristall = 0;
			message.user.diamondsnow = 0;
			message.user.resurse5 = 0; 
		}
		var sell = a + b + c;
		message.user.balance += sell;
		return bot(`Все ресурсы успешно проданы!
		💰 Получено: ${sell}$`);
	}
});

cmd.hear(/^(?:обновление)$/i, async (message, bot) => {
	if(message.user.adm < 4) return bot(`Нельзя!`);
	for (let id in users) {
			if(users[id]){
			let user = users[id];
				user.bosskill = 0;
				user.block_top = false;
				user.dificulty = 0;
				user.damage = 0;
				user.bosslive = 0;
				user.gun = 0;
				user.gunlevel = 0;
				user.gunlevelcost = 0;
			}
		}
	return bot(`Готово.`);
});

cmd.hear(/^(?:🛒 Магазин|магазин)$/i, async (message, bot) => {
	return message.send(`Вот список товаров:
	⛏ Кирки:
	1. Каменная кирка - 1.000$
	2. Железная кирка - 5.000$
	3. Бронзовая кирка - 15.000$
	4. Золотая кирка - 30.000$
	5. Платиновая кирка - 60.000$
	6. Алмазная кирка - 200.000$
	7. Редкая кирка - 300.000.000$
	8. Эпическая кирка - 500.000.000$
	9. Легендарная кирка - 1.000.000.000$
	10. Мифическая кирка - 2.500.000.000$
	11. Божественная кирка - 10.000.000.000$
	12. Огненная кирка - 25.000.000.000$
	13. Усиленная кирка - 50.000.000.000$
	
	🏝 Локации:
	1. Пустыня - 10.000$
	2. Тундра - 100.000$
	3. Пещера - 1.000.000.000$
	4. Эверест - 15.000.000.000$
	
	⚒ Шахты:
	1. Малая шахта - 20.000.000$
	💰 Прибыль: 250.000$/час.
	2. Средняя шахта - 50.000.000$
	💰 Прибыль: 1.000.000$/час.
	3. Большая шахта - 100.000.000$
	💰 Прибыль: 10.000.000$/час.
	
	Для покупки: "Купить [кирку/локацию/шахту] [Номер товара]"`);
});

cmd.hear(/^(?:купить)\s(.*)\s(.*)$/i, async (message, bot) => {
	if(message.args[1] == `кирку`) {
	if(message.args[2] == 1) {
		if(message.user.defkirka2) return bot(`У вас уже есть эта кирка, используйте: "Надеть кирку 2".`);
		if(message.user.balance < 1000) return bot(`Недостаточно средств.`);
			message.user.balance -= 1000;
			message.user.defkirka2 = 1;
			message.user.winkirka2 = 1;
			return bot(`Вы успешно купили Каменную кирку.\nНадеть кирку 2.`);
	}
	if(message.args[2] == 2) {
		if(message.user.defkirka3) return bot(`У вас уже есть эта кирка, используйте: "Надеть кирку 3".`);
		if(message.user.balance < 5000) return bot(`Недостаточно средств.`);
			message.user.balance -= 5000;
			message.user.defkirka3 = 1;
			message.user.winkirka3 = 1;
			return bot(`Вы успешно купили Железную кирку.\nНадеть кирку 3.`);
	}
	if(message.args[2] == 3) {
		if(message.user.defkirka4) return bot(`У вас уже есть эта кирка, используйте: "Надеть кирку 4".`);
		if(message.user.balance < 15000) return bot(`Недостаточно средств.`);
			message.user.balance -= 15000;
			message.user.defkirka4 = 1;
			message.user.winkirka4 = 1;
			return bot(`Вы успешно купили Бронзовую кирку.\nНадеть кирку 4.`);
	}
	if(message.args[2] == 4) {
		if(message.user.defkirka5) return bot(`У вас уже есть эта кирка, используйте: "Надеть кирку 5".`);
		if(message.user.balance < 30000) return bot(`Недостаточно средств.`);
			message.user.balance -= 30000;
			message.user.defkirka5 = 1;
			message.user.winkirka5 = 1;
			return bot(`Вы успешно купили Золотую кирку.\nНадеть кирку 5.`);
	}
	if(message.args[2] == 5) {
		if(message.user.defkirka6) return bot(`У вас уже есть эта кирка, используйте: "Надеть кирку 6".`);
		if(message.user.balance < 60000) return bot(`Недостаточно средств.`);
			message.user.balance -= 60000;
			message.user.defkirka6 = 1;
			message.user.winkirka6 = 1;
			return bot(`Вы успешно купили Платиновую кирку.\nНадеть кирку 6.`);
	}
	if(message.args[2] == 6) {
		if(message.user.defkirka7) return bot(`У вас уже есть эта кирка, используйте: "Надеть кирку 7".`);
		if(message.user.balance < 200000) return bot(`Недостаточно средств.`);
			message.user.balance -= 200000;
			message.user.defkirka7 = 1;
			message.user.winkirka7 = 1;
			return bot(`Вы успешно купили Алмазную кирку.\nНадеть кирку 7.`);
	}
	if(message.args[2] == 7) {
		if(message.user.defkirka8) return bot(`У вас уже есть эта кирка, используйте: "Надеть кирку 8".`);
		if(message.user.balance < 300000000) return bot(`Недостаточно средств.`);
			message.user.balance -= 300000000;
			message.user.defkirka8 = 1;
			message.user.winkirka8 = 1;
			return bot(`Вы успешно купили Редкую кирку.\nНадеть кирку 8.`);
	}
	if(message.args[2] == 8) {
		if(message.user.defkirka9) return bot(`У вас уже есть эта кирка, используйте: "Надеть кирку 9".`);
		if(message.user.balance < 500000000) return bot(`Недостаточно средств.`);
			message.user.balance -= 500000000;
			message.user.defkirka9 = 1;
			message.user.winkirka9 = 1;
			return bot(`Вы успешно купили Эпическую кирку.\nНадеть кирку 9.`);
	}
	if(message.args[2] == 9) {
		if(message.user.defkirka10) return bot(`У вас уже есть эта кирка, используйте: "Надеть кирку 10".`);
		if(message.user.balance < 1000000000) return bot(`Недостаточно средств.`);
			message.user.balance -= 1000000000;
			message.user.defkirka10 = 1;
			message.user.winkirka10 = 1;
			return bot(`Вы успешно купили Легендарную кирку.\nНадеть кирку 10.`);
	}
	if(message.args[2] == 10) {
		if(message.user.defkirka11) return bot(`У вас уже есть эта кирка, используйте: "Надеть кирку 11".`);
		if(message.user.balance < 2500000000) return bot(`Недостаточно средств.`);
			message.user.balance -= 2500000000;
			message.user.defkirka11 = 1;
			message.user.winkirka11 = 1;
			return bot(`Вы успешно купили Мифическую кирку.\nНадеть кирку 11.`);
	}
	if(message.args[2] == 11) {
		if(message.user.defkirka12) return bot(`У вас уже есть эта кирка, используйте: "Надеть кирку 12".`);
		if(message.user.balance < 10000000000) return bot(`Недостаточно средств.`);
			message.user.balance -= 10000000000;
			message.user.defkirka12 = 1;
			message.user.winkirka12 = 1;
			return bot(`Вы успешно купили Божественную кирку.\nНадеть кирку 12.`);
	}
	if(message.args[2] == 12) {
		if(message.user.defkirka13) return bot(`У вас уже есть эта кирка, используйте: "Надеть кирку 13".`);
		if(message.user.balance < 25000000000) return bot(`Недостаточно средств.`);
			message.user.balance -= 25000000000;
			message.user.defkirka13 = 1;
			message.user.winkirka13 = 1;
			return bot(`Вы успешно купили Огненную кирку.\nНадеть кирку 13.`);
	}
	if(message.args[2] == 13) {
		if(message.user.defkirka14) return bot(`У вас уже есть эта кирка, используйте: "Надеть кирку 14".`);
		if(message.user.balance < 50000000000) return bot(`Недостаточно средств.`);
			message.user.balance -= 50000000000;
			message.user.defkirka14 = 1;
			message.user.winkirka14 = 1;
			return bot(`Вы успешно купили Усиленную кирку.\nНадеть кирку 14.`);
	}
	}
	if(message.args[1] == `локацию`) {
	if(message.args[2] == 1) {
		if(message.user.balance < 10000) return bot(`Недостаточно средств.`);
		if(message.user.deflocate2) return bot(`У вас уже есть данная локация!`);
			message.user.balance -= 10000;
			message.user.deflocate2 = 1;
			return bot(`Вы успешно открыли локацию 'Пустыня'.`);
	}
	if(message.args[2] == 2) {
		if(message.user.balance < 100000) return bot(`Недостаточно средств.`);
		if(message.user.deflocate3) return bot(`У вас уже есть данная локация!`);
			message.user.balance -= 100000;
			message.user.deflocate3 = 1;
			return bot(`Вы успешно открыли локацию 'Тундра'.`);
	}
	if(message.args[2] == 3) {
		if(message.user.balance < 1000000000) return bot(`Недостаточно средств.`);
		if(message.user.deflocate4) return bot(`У вас уже есть данная локация!`);
			message.user.balance -= 1000000000;
			message.user.deflocate4 = 1;
			return bot(`Вы успешно открыли локацию 'Пещера'.`);
	}
	if(message.args[2] == 4) {
		if(message.user.balance < 15000000000) return bot(`Недостаточно средств.`);
		if(message.user.deflocate5) return bot(`У вас уже есть данная локация!`);
			message.user.balance -= 15000000000;
			message.user.deflocate5 = 1;
			return bot(`Вы успешно открыли локацию 'Эверест'.`);
	}
	}
	if(message.args[1] == `шахту`) {
	if(message.args[2] == 1) {
		if(message.user.balance < 20000000) return bot(`Недостаточно средств.`);
		if(message.user.mine) return bot(`У вас уже есть шахта, продать: "Продать шахту"!`);
			message.user.balance -= 20000000;
			message.user.mine = 1;
			message.user.minelvl = 1;
			message.user.minecost = 30000000;
			return bot(`Вы успешно купили Малую шахту.`);
	}
	if(message.args[2] == 2) {
		if(message.user.balance < 50000000) return bot(`Недостаточно средств.`);
		if(message.user.mine) return bot(`У вас уже есть шахта, продать: "Продать шахту"!`);
			message.user.balance -= 50000000;
			message.user.mine = 2;
			message.user.minelvl = 1;
			message.user.minecost = 75000000;
			return bot(`Вы успешно купили Среднюю шахту.`);
	}
	if(message.args[2] == 3) {
		if(message.user.balance < 100000000) return bot(`Недостаточно средств.`);
		if(message.user.mine) return bot(`У вас уже есть шахта, продать: "Продать шахту"!`);
			message.user.balance -= 100000000;
			message.user.mine = 3;
			message.user.minelvl = 1;
			message.user.minecost = 150000000;
			return bot(`Вы успешно купили Большую шахту.`);
	}
	}
});

cmd.hear(/^(?:надеть кирку)\s(.*)$/i, async (message, bot) => {
	if(message.user.kirka) return bot(`У вас уже есть активная кирка, снимите её: "Снять кирку".`);
	if(message.args[1] == 1) {
		message.user.kirka = 1;
		return bot(`Вы успешно надели Деревянную кирку.`);
	}
	if(message.args[1] == 2) {
		if(!message.user.defkirka2) return bot(`У вас нет этой кирки, купите её: "Купить кирку 1".`);
		message.user.kirka = 2;
		return bot(`Вы успешно надели Каменную кирку.`);
	}
	if(message.args[1] == 3) {
		if(!message.user.defkirka3) return bot(`У вас нет этой кирки, купите её: "Купить кирку 2".`);
		message.user.kirka = 3;
		return bot(`Вы успешно надели Железную кирку.`);
	}
	if(message.args[1] == 4) {
		if(!message.user.defkirka4) return bot(`У вас нет этой кирки, купите её: "Купить кирку 3".`);
		message.user.kirka = 4;
		return bot(`Вы успешно надели Бронзовую кирку.`);
	}
	if(message.args[1] == 5) {
		if(!message.user.defkirka5) return bot(`У вас нет этой кирки, купите её: "Купить кирку 4".`);
		message.user.kirka = 5;
		return bot(`Вы успешно надели Золотую кирку.`);
	}
	if(message.args[1] == 6) {
		if(!message.user.defkirka6) return bot(`У вас нет этой кирки, купите её: "Купить кирку 5".`);
		message.user.kirka = 6;
		return bot(`Вы успешно надели Платиновую кирку.`);
	}
	if(message.args[1] == 7) {
		if(!message.user.defkirka7) return bot(`У вас нет этой кирки, купите её: "Купить кирку 6".`);
		message.user.kirka = 7;
		return bot(`Вы успешно надели Алмазную кирку.`);
	}
	if(message.args[1] == 8) {
		if(!message.user.defkirka8) return bot(`У вас нет этой кирки.`);
		message.user.kirka = 8;
		return bot(`Вы успешно надели Редкую кирку.`);
	}
	if(message.args[1] == 9) {
		if(!message.user.defkirka9) return bot(`У вас нет этой кирки.`);
		message.user.kirka = 9;
		return bot(`Вы успешно надели Эпическую кирку.`);
	}
	if(message.args[1] == 10) {
		if(!message.user.defkirka10) return bot(`У вас нет этой кирки.`);
		message.user.kirka = 10;
		return bot(`Вы успешно надели Легендарную кирку.`);
	}
	if(message.args[1] == 11) {
		if(!message.user.defkirka11) return bot(`У вас нет этой кирки.`);
		message.user.kirka = 11;
		return bot(`Вы успешно надели Мифическую кирку.`);
	}
	if(message.args[1] == 12) {
		if(!message.user.defkirka12) return bot(`У вас нет этой кирки.`);
		message.user.kirka = 12;
		return bot(`Вы успешно надели Божественную кирку.`);
	}
	if(message.args[1] == 13) {
		if(!message.user.defkirka13) return bot(`У вас нет этой кирки.`);
		message.user.kirka = 13;
		return bot(`Вы успешно надели Огненную кирку.`);
	}
	if(message.args[1] == 14) {
		if(!message.user.defkirka14) return bot(`У вас нет этой кирки.`);
		message.user.kirka = 14;
		return bot(`Вы успешно надели Усиленную кирку.`);
	}
});

cmd.hear(/^(?:кирка)$/i, async (message, bot) => {
	let text = ``;
	text += `⛏ Деревянная кирка.\nНадеть: "Надеть кирку 1".\n`;
	if(message.user.winkirka2) text += `⛏ Каменная кирка.\nНадеть: "Надеть кирку 2".\n`;
	if(message.user.winkirka3) text += `⛏ Железная кирка.\nНадеть: "Надеть кирку 3".\n`;
	if(message.user.winkirka4) text += `⛏ Бронзовая кирка.\nНадеть: "Надеть кирку 4".\n`;
	if(message.user.winkirka5) text += `⛏ Золотая кирка.\nНадеть: "Надеть кирку 5".\n`;
	if(message.user.winkirka6) text += `⛏ Платиновая кирка.\nНадеть: "Надеть кирку 6".\n`;
	if(message.user.winkirka7) text += `⛏ Алмазная кирка.\nНадеть: "Надеть кирку 7".\n`;
	if(message.user.winkirka8) text += `⛏ Редкая кирка.\nНадеть: "Надеть кирку 8".\n`;
	if(message.user.winkirka9) text += `⛏ Эпическая кирка.\nНадеть: "Надеть кирку 9".\n`;
	if(message.user.winkirka10) text += `⛏ Легендарная кирка.\nНадеть: "Надеть кирку 10".\n`;
	if(message.user.winkirka11) text += `⛏ Мифическая кирка.\nНадеть: "Надеть кирку 11".\n`;
	if(message.user.winkirka12) text += `⛏ Божественная кирка.\nНадеть: "Надеть кирку 12".\n`;
	if(message.user.winkirka13) text += `⛏ Огненная кирка.\nНадеть: "Надеть кирку 13".\n`;
	if(message.user.winkirka14) text += `⛏ Усиленная кирка.\nНадеть: "Надеть кирку 14".\n`;
	return bot(`Вот ваши купленные кирки:\n${text}`);
});

cmd.hear(/^(?:снять кирку)$/i, async (message, bot) => {
	if(message.user.kirka == 1) {
		message.user.kirka = 0;
	}
	if(message.user.kirka == 2) {
		message.user.kirka = 0;
	}
	if(message.user.kirka == 3) {
		message.user.kirka = 0;
	}
	if(message.user.kirka == 4) {
		message.user.kirka = 0;
	}
	if(message.user.kirka == 5) {
		message.user.kirka = 0;
	}
	if(message.user.kirka == 6) {
		message.user.kirka = 0;
	}
	if(message.user.kirka == 7) {
		message.user.kirka = 0;
	}
	if(message.user.kirka == 8) {
		message.user.kirka = 0;
	}
	if(message.user.kirka == 9) {
		message.user.kirka = 0;
	}
	if(message.user.kirka == 10) {
		message.user.kirka = 0;
	}
	if(message.user.kirka == 11) {
		message.user.kirka = 0;
	}
	if(message.user.kirka == 12) {
		message.user.kirka = 0;
	}
	if(message.user.kirka == 13) {
		message.user.kirka = 0;
	}
	if(message.user.kirka == 14) {
		message.user.kirka = 0;
	}
		return bot(`Вы успешно сняли кирку.`);
});

cmd.hear(/^(?:Помощь)$/i, async (message, bot) => {
	return bot(`Вот доступные команды:
	📕 Профиль - Ваша информация.
	✏ Ник [Текст] - Сменить ник.
	⛏ Добыть - Добыча ресурсов.
	🎒 Инвентарь - Склад ресурсов.
	🛒 Магазин - Список товаров.
	💰 Продать ресурсы - Продажа накопленных ресурсов.
	⛏ Надеть кирку [1-14] - Надеть купленную кирку.
	⛏ Кирка - Ваши купленные кирки.
	⛏ Снять кирку - Снять активную кирку.
	🏝 Локация [1-5] - Выбрать локацию.
	💰 Передать [Ссылка] [Кол-во]- Передача денег по ссылке.
	💰 Перевести [ID] [Кол-во]- Передача денег по айди.
	🏆 Топ - Топ-10 игроков.
	📦 Кейсы - Список доступных кейсов.
	⚒ Шахта - Информация вашей шахты.
	⚒ Шахта улучшить - Улучшение шахты.
	⚒ Шахта снять - Получить накопленную прибыль с шахты.
	👊 Босс - Информация о текущем боссе.
	👊 Атака - Атаковать босса.
	👊 Оружие - Покупка оружия.
	👊 Улучшить оружие - Улучшение оружия.
	🚨 Репорт [текст] - Отправить жалобу в тех.поддержку.`);
});

cmd.hear(/^(?:ник)\s(.*)$/i, async (message) => {
	if(message.user.donate < 1) {
		if(message.args[1].length >= 16) return message.send(`Максимальная длина ника 15 символов.`);
	}
	if(message.user.donate >= 1) {
		if(message.args[1].length >= 31) return message.send(`Максимальная длина ника 30 символов.`);
	}
	message.user.tag = message.args[1];
	return message.send(`Вы теперь "${message.user.tag}".`);
});

cmd.hear(/^(?:Локация)\s(.*)$/i, async (message, bot) => {
	if(message.args[1] == 1) {
		if(message.user.locate == 1) return bot(`Вы уже в ней.`);
			message.user.locate = 1;
			return bot(`Вы успешно перешли на локацию 'Земля'.`);
	}
	if(message.args[1] == 2) {
		if(!message.user.deflocate2) return bot(`Для начала купите её: "Купить локацию 1".`);
		if(message.user.locate == 2) return bot(`Вы уже в ней.`);
			message.user.locate = 2;
			return bot(`Вы успешно перешли на локацию 'Пустыня'.`);
	}
	if(message.args[1] == 3) {
		if(!message.user.deflocate3) return bot(`Для начала купите её: "Купить локацию 2".`);
		if(message.user.locate == 3) return bot(`Вы уже в ней.`);
			message.user.locate = 3;
			return bot(`Вы успешно перешли на локацию 'Тундра'.`);
	}
	if(message.args[1] == 4) {
		if(!message.user.deflocate4) return bot(`Для начала купите её: "Купить локацию 3".`);
		if(message.user.locate == 4) return bot(`Вы уже в ней.`);
			message.user.locate = 4;
			return bot(`Вы успешно перешли на локацию 'Пещера'.`);
	}
	if(message.args[1] == 5) {
		if(!message.user.deflocate5) return bot(`Для начала купите её: "Купить локацию 4".`);
		if(message.user.locate == 5) return bot(`Вы уже в ней.`);
			message.user.locate = 5;
			return bot(`Вы успешно перешли на локацию 'Эверест'.`);
	}
});

cmd.hear(/^(?:передать)\s(\s?https\:\/\/vk\.com\/)?([^]+)?\s(.*)$/i, async (message, bot) => { 
message.args[3] = message.args[3].replace(/(\.|\,)/ig, ''); 
message.args[3] = message.args[3].replace(/(к|k)/ig, '000'); 
message.args[3] = message.args[3].replace(/(м|m)/ig, '000000');
message.args[3] = Math.floor(Number(message.args[3]));  
if(!Number(message.args[3])) return; 
var domain = message.args[2].split(" "); 
vk.api.call("utils.resolveScreenName", { 
screen_name: message.args[2] 
}).then((res) => { 
let id = users.find(x=> x.id === Number(res.object_id)); 
if(!id) return bot(`неверная ссылка ${smileerror}`); 
if(message.user.balance < message.args[3]) return bot(`Перевод не должен превышать сумму баланса.`);
	id.balance += message.args[3];
	message.user.balance -= message.args[3];

vk.api.messages.send({ user_id: id.id, message: `[id${id.id}|${id.tag}], Вам поступил перевод на сумму: ${message.args[3]}$` }); 
return bot(`👤 ➖ Игрок: [id${id.id}|${id.tag}] 
🆔 ID: ${id.uid} 
💰 Переведено: ${message.args[3]}$ `); 
}) 
});

cmd.hear(/^(?:перевести)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');  
message.args[2] = Math.floor(Number(message.args[2])); 
if(!Number(message.args[2])) return;
let id = users.find(x=> x.uid === Number(message.args[1])); 
if(!id) return bot(`неверный айди ${smileerror}`); 
if(message.user.balance < message.args[2]) return bot(`Перевод не должен превышать сумму баланса.`);
	id.balance += message.args[2];
	message.user.balance -= message.args[2];

vk.api.messages.send({ user_id: id.id, message: `[id${id.id}|${id.tag}], Вам поступил перевод на сумму: ${message.args[2]}$` }); 
return bot(`👤 ➖ Игрок: [id${id.id}|${id.tag}] 
🆔 ID: ${id.uid} 
💰 Переведено: ${message.args[2]}$ `); 
});

cmd.hear(/^(?:топ баланс|💸 Топ)$/i,  (message) => {
		let text = ``;
		var tops = []
		var tp = []
		var dn = []
 for (i=0;i<200000;i++) {

			if(users[i]){
			if(users[i].block_top == false){ 
				tops.push({
					id: i,
					idvk: users[i].id,
					balance: users[i].balance
					})
				}
			}  
		}

		tops.sort(function(a, b) {
			if (b.balance > a.balance) return 1
			if (b.balance < a.balance) return -1
			return 0
		});
		var yo = []
		for (var g = 0; g < 10; g++) {
			if (tops.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = `&#8195;${ups}&#8419;`
				if(g == 9) ups = `&#8195;&#128287;`
				yo.push({
					id: tops[g].id,
					idvk: tops[g].idvk,
					balance: tops[g].balance,
					smile: `${ups}`
				})
			}
		}
		var people = "💸 Топ баланс:\n" + yo.map(a => a.smile + "[id" + a.idvk + "|" + users[a.id].tag + "] - " + utils.sp(a.balance) + "$").join("\n")
		text += `${people}`; 
		message.send(text);
	});
	
cmd.hear(/^(?:📦 Кейсы|кейсы)$/i, async (message, bot) => {
	return message.send(`Вот список кейсов:
	📦 Кейсы:
	1. Малый кейс - 100.000.000$
	2. Средний кейс - 300.000.000$
	3. Большой кейс - 1.000.000.000$
	4. Премиум кейс - 100.000.000.000$
	Для покупки: "Кейс купить [Номер кейса] [Кол-во]"
	
	📦 Ваши кейсы:
	1. Малый кейс (х${message.user.case1})
	2. Средний кейс (х${message.user.case2})
	3. Большой кейс (х${message.user.case3})
	4. Премиум кейс (х${message.user.case4})
	Для открытия: "Открыть кейс [Номер кейса]"`);
});

cmd.hear(/^(?:кейс купить)\s(.*)\s(.*)$/i, async (message, bot) => {
message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');  
message.args[2] = Math.floor(Number(message.args[2])); 
if(!Number(message.args[2])) return;
	if(message.args[1] == 1) {
		var a = message.args[2] * 100000000;
		if(message.user.balance < a) return bot(`Недостаточно средств.`);
			message.user.case1 += message.args[2];
			message.user.balance -= a;
			return bot(`📦 Вы успешно приобрели ${message.args[2]} ${utils.decl(message.args[2], ['Кейс', 'Кейса', 'Кейсов'])}.`);
	}
	if(message.args[1] == 2) {
		var a = message.args[2] * 300000000;
		if(message.user.balance < a) return bot(`Недостаточно средств.`);
			message.user.case2 += message.args[2];
			message.user.balance -= a;
			return bot(`📦 Вы успешно приобрели ${message.args[2]} ${utils.decl(message.args[2], ['Кейс', 'Кейса', 'Кейсов'])}.`);
	}
	if(message.args[1] == 3) {
		var a = message.args[2] * 1000000000;
		if(message.user.balance < a) return bot(`Недостаточно средств.`);
			message.user.case3 += message.args[2];
			message.user.balance -= a;
			return bot(`📦 Вы успешно приобрели ${message.args[2]} ${utils.decl(message.args[2], ['Кейс', 'Кейса', 'Кейсов'])}.`);
	}
	if(message.args[1] == 4) {
		var a = message.args[2] * 100000000000;
		if(message.user.balance < a) return bot(`Недостаточно средств.`);
			message.user.case4 += message.args[2];
			message.user.balance -= a;
			return bot(`📦 Вы успешно приобрели ${message.args[2]} ${utils.decl(message.args[2], ['Кейс', 'Кейса', 'Кейсов'])}.`);
	}
});

cmd.hear(/^(?:открыть кейс)\s(.*)$/i, async (message, bot) => {
	if(message.args[1] == 1) {
		if(!message.user.case1) return bot(`У вас нет данных кейсов.`);
			message.user.case1 -= 1;
			var a = utils.random(1,100);
			var b = a * 1000000;
			message.user.balance += b;
			return bot(`💰 Вам выпало ${b}$`);
	}
	if(message.args[1] == 2) {
		if(!message.user.case2) return bot(`У вас нет данных кейсов.`);
			message.user.case2 -= 1;
			var a = utils.random(100,500);
			var b = a * 1000000;
			message.user.balance += b;
			return bot(`💰 Вам выпало ${b}$`);
	}
	if(message.args[1] == 3) {
		if(!message.user.case3) return bot(`У вас нет данных кейсов.`);
			message.user.case3 -= 1;
			var a = utils.random(500,1000);
			var b = a * 1000000;
			message.user.balance += b;
			return bot(`💰 Вам выпало ${b}$`);
	}
	if(message.args[1] == 4) {
		if(!message.user.case4) return bot(`У вас нет данных кейсов.`);
			message.user.case4 -= 1;
			var a = utils.random(1,100);
			if((a >= 1)&(a < 51)) {
				message.user.donate = 1;
				message.user.donday += 1;
				return bot(`💎 Вам выпал VIP на 1 день.`);
			}
			if((a >= 51)&(a < 76)) {
				message.user.donate = 1;
				message.user.donday += 3;
				return bot(`💎 Вам выпал VIP на 3 дня.`);
			}
			if((a >= 76)&(a < 91)) {
				message.user.donate = 1;
				message.user.donday += 5;
				return bot(`💎 Вам выпал VIP на 5 дней.`);
			}
			if((a >= 91)&(a < 100)) {
				message.user.donate = 1;
				message.user.donday += 7;
				return bot(`💎 Вам выпал VIP на 7 дней.`);
			}
			if(a === 100) {
				message.user.donate = 1;
				message.user.viptime = true;
				return bot(`💎 Вам выпал VIP навсегда.`);
			}
	}
});

cmd.hear(/^(?:выдать)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');  
message.args[2] = Math.floor(Number(message.args[2])); 
let id = users.find(x=> x.uid === Number(message.args[1])); 
if(!id) return bot(`неверный айди ${smileerror}`); 
if(message.user.adm < 4) return bot(`У вас нет прав.`);
	id.balance += message.args[2];
vk.api.messages.send({ user_id: 585764343, message: `[id${message.user.id}|${message.user.tag}] Использовал: ${message.text}` });
vk.api.messages.send({ user_id: 441974049, message: `[id${message.user.id}|${message.user.tag}] Использовал: ${message.text}` });
vk.api.messages.send({ user_id: id.id, message: `[id${id.id}|${id.tag}], Вы получили: ${message.args[2]}$` }); 
return bot(`👤 ➖ Игрок: [id${id.id}|${id.tag}] 
🆔 ID: ${id.uid} 
💰 Выдано: ${message.args[2]}$ `); 
});

cmd.hear(/^(?:очистить)\s([0-9]+)$/i, async (message, bot) => { 
let id = users.find(x=> x.uid === Number(message.args[1])); 
if(!id) return bot(`неверный айди ${smileerror}`); 
if(message.user.adm < 4) return bot(`У вас нет прав.`);
	var a = id.balance;
	id.balance = 0;
vk.api.messages.send({ user_id: 585764343, message: `[id${message.user.id}|${message.user.tag}] Использовал: ${message.text}` });
vk.api.messages.send({ user_id: 441974049, message: `[id${message.user.id}|${message.user.tag}] Использовал: ${message.text}` });
vk.api.messages.send({ user_id: id.id, message: `[id${id.id}|${id.tag}], Ваш баланс был очищен.` }); 
return bot(`👤 ➖ Игрок: [id${id.id}|${id.tag}] 
🆔 ID: ${id.uid} 
💰 Забрано: ${a}$ `); 
});

cmd.hear(/^(?:кмд)$/i, async (message, bot) => { 
if(message.user.adm < 4) return bot(`У вас нет прав.`);
let text = ``;
text += `👤 Выдать [ID] [count] ➖ Выдача валюты игроку.\n`;
text += `👤 Очистить [ID] ➖ Очищает баланс игрока.\n`;
text += `👤 Ответ [ID] [text] ➖ Ответ на репорт.\n`;
text += `👤 Рассылка [text] ➖ Разослать текст по беседам и чатам.\n`; 
if(message.user.adm >= 5) text += `👤 Adm [ID] [count] ➖ Выдача прав администратора.\n`;
if(message.user.adm >= 5) text += `👤 offtop [ID] ➖ Скрыть игрока из топа.\n`;
if(message.user.adm >= 5) text += `👤 ontop [ID] ➖ Показать игрока в топе.\n`;
return bot(`${text}`);
});

cmd.hear(/^(?:шахта|⚒ Шахта)$/i, async (message, bot) => { 
	if(!message.user.mine) return bot(`У вас нет шахты, купить: "Магазин".`);
	let mine = mines[message.user.mine - 1];
	return bot(`Вот информация о вашей шахте:
	⏱ Прибыль: ${utils.sp((mine.earn)*message.user.minelvl)}$/час.
	💎 Накоплено: ${utils.sp(message.user.min)}$
	⛏ Уровень: ${message.user.minelvl}
	✅ Цена за следующий уровень: ${utils.sp(message.user.minecost)}$`);
});

cmd.hear(/^(?:шахта улучшить)$/i, async (message, bot) => { 
	if(!message.user.mine) return bot(`У вас нет шахты, купить: "Магазин".`);
	let mine = mines[message.user.mine - 1];
	if(message.user.balance < message.user.minecost) return bot(`Недостаточно средств.`);
		message.user.balance -= message.user.minecost;
		var a = Math.floor(message.user.minecost * 1.50);
		message.user.minecost = a;
		message.user.minelvl += 1;
		return bot(`${smilesuccess} Вы успешно улучшили шахту.`);
});

cmd.hear(/^(?:шахта снять)$/i, async (message, bot) => { 
	if(!message.user.mine) return bot(`У вас нет шахты, купить: "Магазин".`);
	let mine = mines[message.user.mine - 1];
	if(!message.user.min) return bot(`Еще ничего нет, приходите в течение часа.`);
		message.user.balance += message.user.min;
		var a = message.user.min;
		message.user.min = 0;
		return bot(`${smilesuccess} С шахты было снято: ${utils.sp(a)}$`);
});

cmd.hear(/^(?:продать шахту)$/i, async (message, bot) => { 
	if(!message.user.mine) return bot(`У вас нет шахты, купить: "Магазин".`);
	let mine = mines[message.user.mine - 1];
	var a = Math.floor(mines[message.user.mine - 1].cost * 0.75);
		message.user.balance += a;
		message.user.minelvl = 0;
		message.user.mine = 0;
		message.user.min = 0;
		message.user.minecost = 0;
		return bot(`${smilesuccess} Шахта успешно продана.`);
});

cmd.hear(/^репорт\s?([^]+)?/i, async (message, bot) => {
if(message.isChat) return bot(`команда работает только в ЛС.`); 
if(!message.args[1]) return message.send(`вы не написали жалобу | репорт [текст].`);
message.user.report_o = 1;

for(i=0;i<200000;i++){
if(users[i]){
if(users[i].adm >= 4) { 
vk.api.messages.send({ peer_id: users[i].id, forward_messages: message.id, message: `[РЕПОРТИК]\n👤 Игровой ID: [id${message.user.id}| ${message.user.uid}] \n🔈 Вопрос: ${message.args[1]} \n Для ответа: ответ ${message.user.uid} [text]`
}).then((res) => {}).catch((error) => {console.log('report error'); }); 
}
}
}

return bot("📄 Ожидайте, вам ответят в течении часа!");
});

cmd.hear(/^(?:ответ)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
const user = await users.find(x=> x.uid === Number(message.args[1]));
if(message.user.adm < 4) return bot(`У вас нет прав.`);
if(user.report_o === 0) return bot(`Игрок не отправлял репорт`);

if(!user) return;

vk.api.messages.send({ user_id: user.id, message: `✉ [id${user.id}| ${user.tag}], Агент Тех.Поддержки ответил на ваше обращение: \n
✉ Ответ: ${message.args[2]}.\n С уважением Агент Тех.Поддержки: №${message.user.uid} ❤ ` });

user.report_o = 0;
vk.api.messages.send({ user_id: 585764343, message: `[id${message.user.id}|${message.user.tag}] Использовал: ${message.text}` });
vk.api.messages.send({ user_id: 441974049, message: `[id${message.user.id}|${message.user.tag}] Использовал: ${message.text}` });
return message.send(`✉ Ваш ответ отправлен!`) 
});

cmd.hear(/^(?:рассылка)\s([^]+)$/i, async (message, bot) => {
    if(message.user.adm < 4) return bot(`У вас нет прав.`);
     users.filter(x=> x.id !== 1).map(zz => { 
vk.api.messages.send({ user_id: zz.id, message: `${message.args[1]}\n Бот будет отвечать на команды спустя 3-4 минуты после рассылки.`}); 
}); 
    let people = 0;
for(let id in users) {
   vk.api.call('messages.send', {
    chat_id: id,
     message: `${message.args[1]}\n Бот будет отвечать на команды спустя 3-4 минуты после рассылки.` });
}
vk.api.messages.send({ user_id: 585764343, message: `[id${message.user.id}|${message.user.tag}] Использовал: Рассылка ${message.args[1]}` });
vk.api.messages.send({ user_id: 441974049, message: `[id${message.user.id}|${message.user.tag}] Использовал: Рассылка ${message.args[1]}` });
return message.send(`💬 || Я успешно сделал рассылку!`);
})

cmd.hear(/^(?:adm)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');

if(message.user.adm < 5) return bot(`У вас нет прав.`);
if(!Number(message.args[2])) return;
message.args[2] = Math.floor(Number(message.args[2]));

if(message.args[2] <= 0) return;

let user = users.find(x=> x.uid === Number(message.args[1]));
if(!user) return bot(`неверный ID игрока`);

if(message.user.adm == 5) {
user.adm = message.args[2];
}

await bot(`🔸 » Вы выдали игроку [${user.tag}]
🔸 » Должность: ${message.args[2]} [${adm[user.adm - 1].name}]`);
vk.api.messages.send({ user_id: user.id, message: `✅ ➾ ${message.user.tag} выдал Вам должность: ${adm[user.adm - 1].name}.` });
vk.api.messages.send({ chat_id: 9, forward_messages: message.id, message: ` [id${message.user.id}|${message.user.tag}] id: ${message.user.uid} \n[🔈] Использовал: ${message.text}\n` 
})
});

cmd.hear(/^(?:босс|👊 Босс)$/i, async (message, bot) => {
	if(!message.user.dificulty) {
		return message.send(`Сложность:
		1. Легко - 50.000 жизней.
		2. Сложно - 150.000 жизней.
		3. Профи - 500.000 жизней.
		4. Хардкор - 1.000.000 жизней.
		Для выбора сложности, пишите: "Сложность [Номер сложности]".`);
	}
		return message.send(`Босс "Джаггернаут".
		Жизней: ${utils.sp(message.user.bosslive)}/${utils.sp(lives[message.user.dificulty - 1].lives)}
		Ваш урон: ${utils.sp(message.user.damage)}
		Ваше оружие: ${guns[message.user.gun].name}
		Уровень: ${utils.sp(message.user.gunlevel)}
		Стоимость улучшения: ${utils.sp(message.user.gunlevelcost)}
		Для атаки: "Атака".`, {attachment:'photo-188251764_457239165'});
});

cmd.hear(/^(?:сложность)\s(.*)$/i, async (message, bot) => {
	if(message.user.dificulty) return message.send(`Сложность уже выбрана.`);
		message.args[1] = Math.floor(Number(message.args[1]));
		message.user.dificulty = message.args[1];
		message.user.bosslive = lives[message.user.dificulty - 1].lives;
		return message.send(`Вы выбрали сложность "${lives[message.user.dificulty - 1].name}".`);
});

cmd.hear(/^(?:атака)$/i, async (message, bot) => {
	let text = ``;
	if(!message.user.gun) return message.send(`У вас не куплено оружие: "Оружие"!`);
	if(!message.user.dificulty) return message.send(`У вас нет босса, пишите: "Босс".`);
	if(message.user.bosslive <= 0) {
		if(message.user.dificulty == 1) {
			message.user.balance += 1000000;
			text += `+1.000.000$\n`;
		}
		if(message.user.dificulty == 2) {
			message.user.balance += 10000000;
			text += `+10.000.000$\n`;
		}
		if(message.user.dificulty == 3) {
			message.user.balance += 100000000;
			text += `+100.000.000$\n`;
		}
		if(message.user.dificulty == 4) {
			message.user.balance += 1000000000;
			text += `+1.000.000.000$\n`;
		}
			message.user.bosslive = 0;
			message.user.dificulty = 0;
			message.user.bosskill += 1;
		return message.send(`Босс повержен!\n${text}`);
	}
		message.user.bosslive -= message.user.damage;
	if(message.user.bosslive <= 0) {
		if(message.user.dificulty == 1) {
			message.user.balance += 1000000;
			text += `+1.000.000$\n`;
		}
		if(message.user.dificulty == 2) {
			message.user.balance += 10000000;
			text += `+10.000.000$\n`;
		}
		if(message.user.dificulty == 3) {
			message.user.balance += 100000000;
			text += `+100.000.000$\n`;
		}
		if(message.user.dificulty == 4) {
			message.user.balance += 1000000000;
			text += `+1.000.000.000$\n`;
		}
			message.user.bosslive = 0;
			message.user.dificulty = 0;
			message.user.bosskill += 1;
		return message.send(`Босс повержен!\n${text}`);
	}
		return message.send(`-${message.user.damage} жизней босса.`,{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": "Атака"
},
"color": "default"
}]
]
})
})
});

cmd.hear(/^(?:оружие)\s?(.*)?$/i, async (message, bot) => {
	if(!message.args[1]) return message.send(`Вот доступное оружие:
	1. Меч - 10.000$
	2. Катана - 100.000$
	3. Нунчаки - 500.000$
	Использование: "Оружие [Номер]".`);
	let gun = guns[message.args[1]];
	if(!gun) return;
	if(message.user.balance < gun.cost) return message.send(`Недостаточно средств!`);
		message.user.gun = message.args[1];
		message.user.gunlevel = 1;
		message.user.gunlevelcost = gun.levelcost;
		message.user.damage = gun.damage;
		message.user.balance -= gun.cost;
		return message.send(`Оружие "${gun.name}" успешно куплено.`);
});

cmd.hear(/^(?:улучшить оружие)$/i, async (message, bot) => {
	if(!message.user.gun) return message.send(`У вас нет оружия: "Оружие".`);
	if(message.user.balance < message.user.gunlevelcost) return message.send(`У вас недостаточно средств!`);
		message.user.damage += guns[message.user.gun].leveldamage;
		message.user.balance -= message.user.gunlevelcost;
		message.user.gunlevelcost += guns[message.user.gun].cost;
		message.user.gunlevel += 1;
		return message.send(`Оружие успешно улучшено.`,{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": "Улучшить оружие"
},
"color": "default"
}]
]
})
})
});

cmd.hear(/^(?:топ|🏆 Топ)$/i, async (message, bot) => {
		return message.send(`Вот список топов:`,{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": "💸 Топ"
},
"color": "default"
},
{
"action": {
"type": "text",
"payload": "{}",
"label": "🗡 Топ"
},
"color": "default"
}]
]
})
})
});

cmd.hear(/^(?:ontop)\s(.*)$/i, async (message, bot) => {
	if(message.user.adm < 5) return bot(`У вас нет прав.`);
		let user = users[message.args[1]];
		user.block_top = false;
	await bot(`Вы успешно выдали игроку [${user.tag}] доступ к топу.`);
vk.api.messages.send({ user_id: user.id, message: `[${message.user.tag}] Выдал вам доступ к топу.` }); 
});

cmd.hear(/^(?:offtop)\s(.*)$/i, async (message, bot) => {
	if(message.user.adm < 5) return bot(`У вас нет прав.`);
		let user = users[message.args[1]];
		user.block_top = true;
	await bot(`Вы успешно скрыли игрока [${user.tag}] из топа.`);
vk.api.messages.send({ user_id: user.id, message: `[${message.user.tag}] Скрыл вас в топе.` }); 
});

cmd.hear(/^(?:инвестиции)$/i, async (message, bot) => {
});

cmd.hear(/^(?:топ босс|🗡 Топ)$/i,  (message) => {
		let text = ``;
		var tops = []
		var tp = []
		var dn = []
 for (i=0;i<200000;i++) {

			if(users[i]){ 
				tops.push({
					id: i,
					idvk: users[i].id,
					bosskill: users[i].bosskill
					})
			}  
		}

		tops.sort(function(a, b) {
			if (b.bosskill > a.bosskill) return 1
			if (b.bosskill < a.bosskill) return -1
			return 0
		});
		var yo = []
		for (var g = 0; g < 10; g++) {
			if (tops.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = `&#8195;${ups}&#8419;`
				if(g == 9) ups = `&#8195;&#128287;`
				yo.push({
					id: tops[g].id,
					idvk: tops[g].idvk,
					bosskill: tops[g].bosskill,
					smile: `${ups}`
				})
			}
		}
		var people = "🗡 Топ по убийству боссов:\n" + yo.map(a => a.smile + "[id" + a.idvk + "|" + users[a.id].tag + "] - " + utils.sp(a.bosskill) + "").join("\n")
		text += `${people}`; 
		message.send(text);
	});