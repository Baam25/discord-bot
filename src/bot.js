
require('dotenv').config()
const {Client} = require('discord.js');

const client = new Client({ intents: [36639] });

client.on('ready', ()=>{
    console.log(`${client.user.username} activo`);
})
const PREFIX = '-'
let respondMentions = true
const checkResponse = (message) => {return  ((message.type == 19 && !message.cleanContent.includes('@Samualex')))}
const checkBot = (message)=>{return message.author.bot}
const checkMention = (message) => {return message.cleanContent.includes('@Samualex')  && message.mentions.has('631660659137839139')}

const checkPermission = (message) => {
    if (message.member.id === '631660659137839139' || !message.member.manageable){
        return true
    }else{
        message.channel.send('No tienes permisos para ese comando')
        return false
    }
}

const respondMessage =  (message) =>{
    const request = require("../responses.json")
    let response = Math.floor(Math.random() * Object.keys(request).length)
     message.reply(request[response])
     .catch(err => console.log(err))    
} 
const setTimeout =  (message, args) =>{
    if (args.length === 0) return message.channel.send('Introduzca usuario y tiempo(ms) \nEl default es 1 min')
    let member = message.guild.members.cache.get(String(args[0].match(/\d+/g)))
    if (member){
        member.timeout(Number(args[1] ?? 60000))
        .then(member => message.channel.send(`Se ha muteado a ${member} \nDiganle 👋 a ${member}`))
        .then(reply => message.channel.send(`👋`))
        .then(reply => reply.react(`👋`))
        .catch(err=>  message.channel.send(err.message) )
    }else{
        message.channel.send('Usuario no encontrado')
    }
}
const reactMessage =  async(message, args)=>{
    let reactedTo = message.channel.messages.cache.get(message.reference.messageId)
    const emojis = message.guild.emojis.cache
    try {
        switch (args[0]) {
            case 'who':
                await reactedTo.react('🇼')
                await reactedTo.react('🇭')
                await reactedTo.react(message.guild.emojis.cache.get('1006727998780756018'))
                break;
            case 'turbo':
                await reactedTo.react('🤓')
                await reactedTo.react('🤢')
                await reactedTo.react('🐒')
                await reactedTo.react('☝️')
                await reactedTo.react('🖕')
                await reactedTo.react('🏳️‍🌈')
                await reactedTo.react('😹')
                await reactedTo.react('😂')
                await reactedTo.react('🐵')
                await reactedTo.react('💩')
                await reactedTo.react('🦍')
                await reactedTo.react(emojis.get('878144589238796298'))
                await reactedTo.react(emojis.get('1006728015461486602'))
                await reactedTo.react(emojis.get('938435334721642566'))
                await reactedTo.react(emojis.get('1009484414264287312'))
                await reactedTo.react('🤮')
                await reactedTo.react(emojis.get('904205214016483359'))
                await reactedTo.react(emojis.get('1006727998780756018'))
                await reactedTo.react(emojis.get('878144570272149544'))
                await reactedTo.react('🇱')
                break;
            case 'gigachad':
                await reactedTo.react(emojis.get('964257527976058890'))
                await reactedTo.react('☝️')
                await reactedTo.react(emojis.get('927358260930027520'))
                await reactedTo.react(emojis.get('861088433949900811'))
                await reactedTo.react(emojis.get('923640913069215795'))
                break;
            case 'omegakek':
                await reactedTo.react(emojis.get('1006728015461486602'))
                await reactedTo.react('☝️')
                await reactedTo.react(emojis.get('862221586915262524'))
                await reactedTo.react('😹')
                await reactedTo.react('😂')
                await reactedTo.react('🤣')
                break;
            case 'voidge':
                await reactedTo.react(emojis.get('917145386202853406'))
                await reactedTo.react(emojis.get('927719713864314902'))
                await reactedTo.react(emojis.get('861088572575842335'))
                await reactedTo.react('😿')
                break;
            default:
                await reactedTo.react('🤓')
                break;
        }
    } catch (error) {
        message.channel.send(error.message)
        if (error.code === 90001) {
            message.channel.send(`${reactedTo.author} tiene bloqueado al bot diganle 👋 por 10 min`)
            setTimeout(reactedTo, [reactedTo.author.id ,600000])
        }
    }
   
}



const getComand =  (message) => {
    const [CMD, ...args] = message.content
    .trim()
    .substring(PREFIX.length)
    .split(/\s+/)
    if (CMD === 'help'){
        message.channel.send(`Lista de comandos 
        \n -help:  "Lista de comandos"
        \n -on/off: "Apagar o encender las respuestas del bot"
        \n -mute: "Mutea al usuario"\n        *comando + [usuario, tiempo]*\n           *usuario: tag a usuario con @*\n           *tiempo: duracion del timeout en milisegundos*
        \n -react: "Reacciona al mensaje respondido"\n        *comando + [opcion]*\n           *opciones: who,omegakek,gigachad,voidge,turbo*` )  
    }else if ((CMD === 'off')){
        if (!checkPermission(message)) return
        respondMentions = false
        message.channel.send(`Respuestas desactivadas`)
    }else if (CMD === 'on'){
        if (!checkPermission(message)) return 
        respondMentions = true
        message.channel.send(`Respuestas activadas`)
    }else if (CMD === 'mute'){
        if (!checkPermission(message)) return
        setTimeout(message,args)
    }else if (CMD === 'react'){
        if (!(message.type === 19)) return message.channel.send('Necesitas usar este comando respondiendo otro mensaje (reply)')
        reactMessage(message,args)   
    }else{
        message.channel.send(`El comando "${CMD}" no existe`)
    }
}

client.on('messageCreate', (message)=>{
    if (message.guild.members.me.isCommunicationDisabled() || checkBot(message)) return
    if (checkMention(message) && !(checkResponse(message)) && respondMentions){
        respondMessage(message)
    }
    if (message.content.startsWith(PREFIX) && !checkMention(message)){ 
        getComand(message)
    }
})


client.login(process.env.DISCORD_BOT_TOKEN);