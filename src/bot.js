require('dotenv').config()

const {Client} = require('discord.js');

const client = new Client({ intents: [36639] });

client.on('ready', ()=>{
    console.log(`${client.user.username} anda ruleta`);
})

client.on('messageCreate', (message)=>{
    if (message.author.bot ) return;
    if (message.mentions.has('631660659137839139')){
        const deano = message.guild.members.cache.get(message.author.id);
        message.react('🤓')
        .then((reaction)=> (message.channel.send(`Y ${message.author} dijo: "${message.cleanContent}   🤓"  Pongase a jalar en vez de andar etiquetando mi hermano ${message.guild.emojis.cache.get('878144589238796298')}`)))
        .catch((err)=>(deano
        .timeout(300000)
        .then((deano) => (message.channel.send(`Muteadita de 5 min hasta que desbloquees el bot ${message.author} ${message.guild.emojis.cache.get('862221586915262524')}`)))
        .catch((err)=>(message.channel.send('No tengo permisos pa mutear a este :(')))))
    };
})

client.login(process.env.DISCORD_BOT_TOKEN);