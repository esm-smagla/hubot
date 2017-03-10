var https = require('https');

var url = '***********************************';

function send(word){
  var targetUrl = url + word;
  var req = https.get(targetUrl, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(str) {
      console.log(str);
    });
  });
}

module.exports = function(robot) {
  robot.respond(/hi/i, function(msg) {
    msg.send('Hi, はっしー');
  });
  robot.respond(/IN/i, function(msg) {
    send('IN');
    msg.send('出勤を記入したよ！');
  });
  robot.respond(/OUT/i, function(msg) {
    send('OUT');
    msg.send('退勤を記入したよ！');
  });
}
