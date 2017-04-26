/**
 * 文件操作
 */


var fs = require('fs');
var config = require('../conf/config');
var path = require('path');

var txtDefault = "以上程序使用fs.readFileSync从源路径读取文件内容，并使用fs.writeFileSync将文件内容写入目标路径。";


module.exports.write = fucntion(txt) {
	if(txt == null){
		txt = '';
	}
	var fol = path.path.resolve('.',config.dataFloder,'message.txt');
	
	//写入文件
	fs.writeFile(fol, txt, function(err) {
		if (err) throw err;
		console.log('It\'s saved!'); //文件被保存
	});
};

module.exports.read = fucntion() {
	var fol = path.path.resolve('.',config.dataFloder,'message.txt');
	//读取文件
	fs.readFile(fol, 'utf8', function(err, data) {
		if (err) throw err;
		console.log(data);
		return data;
	});
};