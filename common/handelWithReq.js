/**
 * 
 */

var kafkaSendMsg = require('./kafka_pro');
var Utils = require('./Utils');



//console.log(__dirname + "handel");
module.exports.handelWithReq = (req, res) => {
	// console.log(req);
	// console.log(res);
	//console.log(req.body.key);
	var data = {};
	data.cookie =  req.headers.cookie;
	data.list = req.body.key;
	data.time = req.body.time;
	data.referer = req.headers['referer'];
	data.userAgent = req.headers['user-agent'];

	//console.log(req.headers);
	//console.log(req.headers);

	kafkaSendMsg(data, (err, result) => {
		if(Utils.isNull(err) && Utils.isNull(result)){
			res.json({status:true});
		}else{
			res.json({status:true,info:(err || result)});
		}
		
	});
};