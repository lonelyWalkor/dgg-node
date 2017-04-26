

var config = {
	port: 8888,//监听的端口号
	debug: true,
	kafkaHost:"172.0.0.1",
	kafkaPort:"8000",
	dataFloder:'data',//数据保存的文件夹
	logFloder:'logs',//日志保存的文件夹
	sendToKafka:false,//是否项kafka发送消息
}

module.exports = config;