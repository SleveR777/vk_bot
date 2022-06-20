const { createBot } = require('mineflayer');
const socks = require('socks').SocksClient;
const readline = require("readline");
const chalk = require('chalk');

module.exports = function(username, proxy) {
const bot = createBot({
    host: 'mc.mstnw.net',
    username: username,
    skipValidation: true,
    version: '1.12.2',
    viewDistance: 'normal',
    plugins: {
        conversions: true,
        furnace: false,
        math: false,
        painting: false,
        scoreboard: true,
        villager: false,
        bed: false,
        book: false,
        boss_bar: true,
        chest: true,
        command_block: true,
        craft: false,
        digging: false,
        dispenser: true,
        enchantment_table: false,
        experience: false,
        rain: false,
        ray_trace: false,
        sound: true,
        tablist: true,
        time: false,
        title: false,
        blocks: true
        },
    checkTimeoutInterval: 60000,
    connect: (client) => {
        socks.createConnection({
        proxy: proxy,
        command: 'connect',
        destination: {
            host: "65.108.80.115",
            port: 25500
        }
        }, (err, info) => {
        if (err) {
            console.log(err)
            return
        }
        client.setSocket(info.socket)
        client.emit('connect')
        })
    }
    })
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });
rl.setPrompt("")
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
function runBot() {
    sleep(3000);
    console.log(chalk.hex('#FFF050')(bot['username'], 'логинится'))
        bot.chat('/l 54014388');
        sleep(3000);
        bot.setQuickBarSlot(0);
        bot.activateItem(false);
        bot.once('windowOpen', function() {
            bot.clickWindow(20, 0, 0);
            console.log(chalk.hex('#6AFF9F')(bot['username'] + ' зашел на спавн'));
        });
    }
var a;
bot.once('login', function() {
    console.log(chalk.hex('#6AFF9F')(bot['username'] + ' зашел в лобби'));
    bot.chat('/l 54014388');
    sleep(3000);
    bot.setQuickBarSlot(0);
    bot.activateItem(false);
    bot.once('windowOpen', function() {
        bot.clickWindow(20, 0, 0);
        console.log(chalk.hex('#FF3399')(bot['username'] + ' зашел на спавн'));
    });
})

bot.on('messagestr', function(messagestr) {
    if(messagestr.indexOf('_SleveR_') || messagestr.indexOf('GOOGRET')) {
        if(messagestr == '[_SleveR_ -> Я] tp') {
            bot.chat("/call _SleveR_")
        }

        else if(messagestr == '[_SleveR_ -> Я] sethome') {
            bot.chat("/delhome home")
            bot.chat("/sethome")
        }
        else if(messagestr == '[_SleveR_ -> Я] spam') {
            for(var i = 0; i < 1000; i++) {
                bot.chat('/msg GOOGRET соси лоускилл диз!')
            }
        }
        else if(messagestr == '[_SleveR_ -> Я] accept' || messagestr == '[GOOGRET -> Я] accept') {
            bot.chat('/tpaccept')
        }
    }
    if(messagestr == '| Проверка пройдена, приятной игры') {
        runBot()
    }
})
bot.on('message', function(message123) {
    console.info(message123.toAnsi())
})
function slever() {
    function nearestEntity(type) {
        var id, entity, dist;
        var best = null;
        var bestDistance = null;
        for(id in bot.entities) {
        entity = bot.entities[id];
        if(type && entity.type !== type) continue;
        if(entity === bot.entity) continue;
        dist = bot.entity.position.distanceTo(entity.position);
        if(!best || dist < bestDistance) {
            best = entity;
            bestDistance = dist;
        }
        }
        return best;
    }
    var entity = nearestEntity();
    if(entity) {
    bot.attack(entity, true);
    }
}

rl.on('line', (message) => {
    try {
        var messages = message.split(' ')
    if(message == 'quit') {
        console.log(chalk.hex('#FF6060')('Бот покинул сервер'))
        process.exit()
    }
    else if(messages[0] == '/an') {
        bot.chat('/dm open anarchy')
            bot.once('windowOpen', function() {
                a = parseInt(messages[1]) + 9
                bot.clickWindow(a, 0, 0);
                console.log(chalk.hex('#42FFEE')(bot['username'] +' зашел на анку'), a - 9);
            })
    }
    else if(messages[0] == '/san') {
        bot.chat('/menu')
            bot.once('windowOpen', function() {
                bot.clickWindow(20, 0, 0);
                console.log(chalk.hex('#FF3399')(bot['username'] +' зашел на спавн'));
            })
    }
    else if(message == 'mess') {
        id = setInterval(slever, 3000)
    }
    else if(message == 'stopmess') {
        clearInterval(id)
    }
    else if(messages[0] == '/spawns') {
        bot.chat('/dm open spawns')
        bot.once('windowOpen', function() {
            a = 19 + parseInt(messages[1])
            bot.clickWindow(a, 0, 0);
            console.log(chalk.hex('#FF3399')(bot['username'] +' зашел на спавн'), parseInt(messages[1]));
        })
    }
    else if(message == 'players') {
        var player_list = ''
        var players = bot.players
        for(var i in players) {
            player_list += i + ', '
        }
        console.log(chalk.hex('#9F44FF')(player_list.slice(0, -2)))
    }
    else if(message == 'scoreboard') {
        console.info(bot.scoreboard)
    }
    else {
        bot.chat(message);
    }

    } catch {
        console.log('Ошибка команды')
    }
});
}