var kafka = require('kafka-node');
var config = require('../conf/config');

var Producer = kafka.Producer;
var KeyedMessage = kafka.KeyedMessage;
var Client = kafka.Client;


console.log('kafka 连接接初始化');


var kafkaUrl = config.kafkaHost + ":" + config.kafkaPort;
var client = new Client(kafkaUrl);



var argv = {
    topic: "topic1"
};
var topic = argv.topic || 'topic10';

var p = argv.p || 0;

var a = argv.a || 0;

var producer = new Producer(client, {
    requireAcks: 1
});


producer.on('ready', () => {
    console.log('kafka 连接接初始化 完成');
    // var args = {
    //     appid: 'wx238c28839a133d0e',
    //     createTime: 'ddd',
    //     toUserName: 'wx238c28839a133d0e',
    //     fromUserName: 'wx238c28839a133d0e'
    // };
    // var keyedMessage = new KeyedMessage('keyed', 'a keyed message');


    //create topics
    // producer.createTopics(['t1'], function (err, data) {
    //     console.log(data);
    // });
});

producer.on('error', (err) => {
    console.log('kafka 连接接初始化 失败');
});

module.exports = (data, callback) => {
    console.log(data);
    if (config.sendToKafka) {
        console.log('kafka begin send');
        producer.send([{
            topic: topic,
            partition: p,
            messages: [JSON.stringify(data)],
            attributes: a
        }], function(err, result) {
            console.log('kafka end send');
            console.log(err || result);
            callback && callback(err, result);
            //process.exit();
        });
    } else {
        callback && callback(null, null);
    }

};