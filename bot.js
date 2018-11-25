var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
const request = require('request');


logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
	colorize: true
});
logger.level = 'debug';
var bot = new Discord.Client({
		token: auth.token,
		autorun: true
	});
bot.on('ready', function (evt) {
	logger.info('Connected');
	logger.info('Logged in as: ');
	logger.info(bot.username + ' - (' + bot.id + ')');
});








bot.on('message', function (user, userID, channelID, message, evt) {
	var ServerID = bot.channels[channelID].guild_id;
	var voiceChannelID=bot.servers[ServerID].members[userID].voice_channel_id;
	var _stream;
	
	
	
	if(message=="!feno")
	{
		if(!bot.channels[channelID].self_mute)
		bot.unmuteSelf(ServerID);
	
	bot.joinVoiceChannel(voiceChannelID, function (b) {
		
		bot.getAudioContext(voiceChannelID, function (error, stream) {
			
			var t=request('https://listen.radyofenomen.com/fenomen/96/icecast.audio');
		
			 t.pipe(stream,{
				end: false
			});
			
			
			stream.on('done', function () {
				
			});
		});
	});
	}
	if(message=="!fenoff" )
	{	
		
		bot.muteSelf(ServerID);
		bot.leaveVoiceChannel(voiceChannelID);
		
		
	
	}
	
});
