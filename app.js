var express = require('express');

var config = require('./conf/config');
var reqHandel = require('./common/handelWithReq');
var bodyParser = require("body-parser");

//PORT=4000 node nodeDemo.js
var port = process.env.PORT || config.port;
var app = express();

//app.set('view','./view');
//app.set('view engine','jade');

//console.log(__dirname + 'app');
/*var path = require('path');
console.log(path.resolve('.'));*/

// need it...  
app.use(bodyParser.urlencoded({ extended: false })); 

app.post('/node/behavior', (req, res) => {
	//res.render('index',{title:'imooc'});
	reqHandel.handelWithReq(req, res);
}).get('/node/', (req, res) => {
	//reqHandel.handelWithReq(req, res);
	res.send('hello word!');
});

// 监听 8888 端口，开启服务器
app.listen(port, (err) => {
	if (err) {
		console.log(err);
		return;
	}
	//var host = server.address().address;
	//var port = server.address().port;
	console.log('Example app listening at ' + port);
	//console.log('Example app listening at http://%s:%s', host, port);
});

/*process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
});*/

process.on('SIGINT', function() {
  console.log('Got SIGINT.  Press Control-D/Control-C to exit.');
  process.exit();
});