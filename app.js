var Botkit = require("botkit");
var request = require("request");
var bot = Botkit.slackbot({
    debug: false
});

bot.spawn({
    token: process.env.SLACKBOT_ISHIHARASATOMI
}).startRTM();


bot.hears('.*',['ambient'],function(bot,message) {
	if(!(message.text.match(/^http/))){
		var rand = Math.floor(Math.random()*100);
		if(rand < 15 && rand%2 == 0){
			var headers = {
				'Content-Type':'application/json'
			}
			var options = {
			  url: 'https://chatbot-api.userlocal.jp/api/chat/',
			  method: 'POST',
			  headers: headers,
			  json: true,
			  form: {
			  	message: encodeURI(message.text),
			  	key: process.env.USER_LOCAL_AI_KEY
			  }
			}
			request(options, function (error, res, body) {
				bot.reply(message, body.result);
			});
		}
	}
});
bot.hears('.*',['direct_message','direct_mention','mention'],function(bot,message) {
	var headers = {
		'Content-Type':'application/json'
	}
	var options = {
	  url: 'https://chatbot-api.userlocal.jp/api/chat/',
	  method: 'POST',
	  headers: headers,
	  json: true,
	  form: {
	  	message: encodeURI(message.text),
	  	key: process.env.USER_LOCAL_AI_KEY
	  }
	}
	request(options, function (error, res, body) {
		bot.reply(message, body.result);
	});
});
