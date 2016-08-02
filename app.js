var Botkit = require("botkit");
var request = require("request");
var Trello = require("node-trello");
// var t = new Trello("031c348b6181692abd2bb24c6daa950a", "4420cb446b6cc5584b8746608fdae6679435734c7da019c5ee59bcc23748e119");
// t.post("/1/boards",{due: null,name: "さとみん"},function(err,data){
// 	console.log(data)
// });
var bot = Botkit.slackbot({
    debug: false
});

bot.spawn({
    token: process.env.SLACKBOT_ISHIHARASATOMI
}).startRTM();

bot.hears('.*',['ambient'],function(bot,message) {
	if(!(message.text.match(/^http/))){
		var rand = Math.floor(Math.random()*100);
		if(rand < 15){
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
			  	key: "707c21dde077c69f68ac"
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
	  	key: "707c21dde077c69f68ac"
	  }
	}
	request(options, function (error, res, body) {
		bot.reply(message, body.result);
	});
});
