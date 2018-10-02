// ==================================================================
const Discord = require("discord.js");
const client = new Discord.Client();
const bot = new Discord.Client();
const ms = require("ms");
const fs = require('fs');
const moment = require('moment');
const request = require('request');
const dateFormat = require('dateformat');
const r1 = require('snekfetch');
const jimp = require('jimp')
const math = require('math-expression-evaluator'); 

const prefix = "#";


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);
});


//=================================== Owner ===================================
const developers = ['316324088865882142'];
const admin = "#";
client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!developers.includes(message.author.id)) return;
 
  if (message.content.startsWith(admin + 'wt')) {
  client.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.send(` ☑ Client Activity Now Is : \`Watching ${argresult} \` `)
  } else 
  if (message.content.startsWith(admin + 'ls')) {
  client.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.send(` ☑ Client Activity Now Is : \`Listening ${argresult} \` `)
  } else 
  if (message.content.startsWith(admin + 'setstream')) {
    client.user.setGame(argresult, "https://www.twitch.tv/idk");
     message.channel.send(` ☑ Client Activity Now Is : \`Streaming ${argresult} \` `)
  }
  if (message.content.startsWith(admin + 'setname')) {
  client.user.setUsername(argresult).then
      message.channel.send(` Client UserName Changed To : \` ${argresult}\` `)
} else
if (message.content.startsWith(admin + 'setavatar')) {
  client.user.setAvatar(argresult);
      message.channel.send(` Client Avatar Changed To : \` ${argresult}\` `)
}
});

client.on('guildMemberAdd', member => {
var Canvas = require('canvas') //npm i canvas
var jimp = require('jimp') //npm i jimp
var channel = member.guild.channels.find('name', 'welcome');
    if(!channel) return;
channel.send('**Welcome** ' + `${member}` + ' **To** ' + `__${member.guild.name}__` + ' **Server** :two_hearts:')          

})

client.on("guildMemberAdd", member => {
  member.createDM().then(function (channel) {
  return channel.send(`** :hearts: Welcome to the server :hearts:
  :grinning:  member name --> __${member}__ :grinning: 
  :bust_in_silhouette:  You are a member number --> __${member.guild.memberCount}__ :bust_in_silhouette:
  :airplane: __${moment().format('HH:mm:ss A')}__ <-- Date of entry of the server ** :airplane: `)
}).catch(console.error)
})


client.on('ready', function(){//npm i ms 
    var ms = 5000 ;
    var setGame = [`Soon | #inv`,`Users! [ " ${client.users.size} " ]`,`servers! [ " ${client.guilds.size} " ]`];
    var i = -1;
    var j = 0;
    setInterval(function (){
        if( i == -1 ){
            j = 1;
        }
        if( i == (setGame.length)-1 ){
            j = -1;
        }
        i = i+j;
        client.user.setGame(setGame[i],`http://www.twitch.tv/v5bz`);
    }, ms);

});


//=================================== Commands ===================================




client.on('message', message => {
            if(!message.channel.guild) return;
let args = message.content.split(' ').slice(1).join(' ');
if (message.content.startsWith(prefix + 'bcall')){
 if(!message.author.id === '316324088865882142') return;
message.channel.sendMessage('Sending message |✅')
client.users.forEach(m =>{
m.sendMessage(args)
})
}
});

 client.on('message', message => {
    if (message.content.startsWith(prefix + "link")) {
        message.channel.createInvite({
        thing: true,
        maxUses: 5,
        maxAge: 3600,
    }).then(invite =>
      message.author.sendMessage(invite.url)
    )
    const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
          .setDescription("The link was sent with a special message :envelope: ")
           .setAuthor(client.user.username, client.user.avatarURL)
                 .setAuthor(client.user.username, client.user.avatarURL)
                .setFooter('Requested by : ' + message.author.tag)

      message.channel.sendEmbed(embed).then(message => {message.delete(10000)})
              const Embed11 = new Discord.RichEmbed()
        .setColor("RANDOM")
        
    .setDescription("** Link duration : Hour | Number of uses of the link > 5 { Enjoy } :smile: **")
      message.author.sendEmbed(Embed11)
    }
}); 

client.on('message', message => {
        if (message.content === prefix + "inv") {
            if(!message.channel.guild) return;
        let embed = new Discord.RichEmbed()
        .setTitle(`:small_orange_diamond: Click Here To Invite Fantastic. `)
        .setURL(`https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`)
     message.channel.sendEmbed(embed);
       }
   });
   
   
     client.on('message', message => {
        var  user = message.mentions.users.first() || message.author;
    if (message.content.startsWith(prefix + "avatar")) {
message.channel.send(`This avatar For ${user} link : ${user.avatarURL}`);
}
});
   
      client.on('message', async message => {
  let messageArray = message.content.split(' ');
  let args = messageArray.slice(1);
  if(message.content.startsWith(prefix + "invite")) {
    if(!args) return message.reply('**Select an invitation name**');
    message.guild.fetchInvites().then(i => {
      let inv = i.get(args[0]);
      if(!inv) return message.reply(`**I could not find ${args}**`);
      var iNv = new Discord.RichEmbed()
      .setAuthor(message.author.username,message.author.avatarURL)
      .setThumbnail(message.author.avatarURL)
      .addField('# - The owner of the invitation',inv.inviter,true)
      .addField('# - The invitation Room',inv.channel,true)
      .addField('# - The end date of the invitation',moment(inv.expiresAt).format('YYYY/M/DD:h'),true)
      .addField('# - Invitation created',moment(inv.createdAt).format('YYYY/M/DD:h'),true)
      .addField('# - Duration of the invitation',moment(inv.maxAge).format('DD **hour** h **day**'),true)
      .addField('# - Uses',inv.uses || inv.maxUses,true)
      message.channel.send(iNv);
    });
  }
});
   
   client.on('message', message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
    if (command === "bans") {
        message.delete(5000)
         if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.reply("Error : \` I Dont Have ADMINISTRATOR Permission\`").then(message => message.delete(5000));
        if(!message.member.hasPermission('ADMINISTRATOR')) return;
        if(!message.channel.guild) return;
        message.guild.fetchBans()
        .then(bans => message.channel.send(`\`${bans.size}\` ***: The number of people banned from the server ***`)).then(message => message.delete(5000))

  .catch(console.error);
}
});

   
   
   client.on('message', message => {
 const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
if (message.author.bot) return;
    if (command === 'mc') {
                        if(!message.channel.guild) return;

if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You Need MANAGE_MESSAGES Permission').then(message => message.delete(5000))
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: false

           }).then(() => {
 const e = new Discord.RichEmbed()
               .setAuthor('Channel Disabled By : '+message.author.username)
                .setColor('#36393e')
               
               message.channel.send(e)
               });
             }
if (command === "umc") {
    
    if(!message.channel.guild) return;

if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You Need MANAGE_MESSAGES Permission').then(message => message.delete(5000))
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: true

           }).then(() => {
               const e = new Discord.RichEmbed()
               .setAuthor('Channel Enabled By : '+message.author.username)
                        .setColor('#36393e')
               
               message.channel.send(e)
           });
             }



});

   
   
      client.on('message',async message =>{ 
    if(message.content.startsWith(prefix + "channels")) {
        let i = 1;
        let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(message.guild.name)
        .setThumbnail(message.guild.iconURL)
        .setDescription(message.guild.channels.map(c => `\`${i++}\` - **${c.name}**`))
        .setFooter(message.guild.channels.size + ' Channels in the server!');
        message.channel.send(embed).then(msg => {
            msg.delete(25000);
            message.delete(25000);
        });
    }
});   
   
   
   
client.on('message', message => {
          let args = message.content.split(' ').slice(1);
   if(message.content.split(' ')[0] == prefix + 'color'){
           const embedd = new Discord.RichEmbed()
     .setFooter('Requested by '+message.author.username, message.author.avatarURL)
   .setDescription(`**There's No Color With This Number ** :x: `)
   .setColor(`ff0000`)

    if(!isNaN(args) && args.length > 0)
    

if    (!(message.guild.roles.find("name",`${args}`))) return  message.channel.sendEmbed(embedd);


       var a = message.guild.roles.find("name",`${args}`)
                if(!a)return;
const embed = new Discord.RichEmbed()
                    
     .setFooter('Requested by '+message.author.username, message.author.avatarURL)
   .setDescription(`**Color Changed To Successfully** :white_check_mark: `)
 
   .setColor(`${a.hexColor}`)
  message.channel.sendEmbed(embed);
          if (!args)return;
setInterval(function(){})
                  let count = 0;
                  let ecount = 0;
        for(let x = 1; x < 201; x++){
           
            message.member.removeRole(message.guild.roles.find("name",`${x}`))
          
            }
                message.member.addRole(message.guild.roles.find("name",`${args}`));
        
            
    }
});   
   
   
   












   
   
   
   
   
   
   
   
   

   // Token
client.login(process.env.BOT_TOKEN);
