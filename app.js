var express = require('express');
var config = require('config');
var bodyParser = require("body-parser");
var log4js = require("./models/log");
var controllers = require('./controllers/controllers');
var cookie = require('cookie-parser');
// var session = require('express-session');
// var redisStore = require('connect-redis')(express);

var app = express();

global.Concurrency = {
	time: parseInt((new Date().getTime())/1000),
	count: 0
};

//cookie配置
app.use(cookie());

// app.use(session({
//   // 假如你不想使用 redis 而想要使用 memcached 的话，代码改动也不会超过 5 行。
//   // 这些 store 都遵循着统一的接口，凡是实现了那些接口的库，都可以作为 session 的 store 使用，比如都需要实现 .get(keyString) 和 .set(keyString, value) 方法。
//   // 编写自己的 store 也很简单
//   store: new redisStore(config.get("sessionStore")),
//   secret: 'JSESSIONID'
// }));


// app.user(express.session({
// 	secret: 'JSESSIONID',
// 	store: new RedisStroe({
// 		host: '192.168.254.62',
// 		port: '6379'
// 		//db: 'mydb' //此属性可选。redis可以进行分库操作。若无此参数，则不进行分库
// 	})
// }));

//注册使用 log4js
log4js.configure();
app.use(log4js.useLog());

//注册并配置 body 内容格式化
app.use(bodyParser.urlencoded({
	extended: false
}));

//注册 控制器
controllers(app);

//注册静态资源
app.use('/static', express.static('static'));

//获取配置文件配置的监听的端口号
var port = config.get('port');
// 监听 8888 端口，开启服务器
app.listen(port, (err) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log('Example app listening at ' + port);
});

/******全局进程事件绑定************/

/*process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
});*/

//监听退出指令
process.on('SIGINT', function() {
	console.log('Got SIGINT.  Press Control-D/Control-C to exit.');
	// console.log(global.bufferArray);
	process.exit();
});

//捕获全局未处理异常
process.on('uncaughtException', function(err) {
	//将异常信息打印到控制台
	console.error('An uncaught error occurred!', err.stack);

});