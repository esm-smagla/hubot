var https = require('https');
var querystring = require('querystring');

var url = 'https://script.google.com/macros/s/***************_***************************************/exec?kind=';

function send(word){
  var targetUrl = url + word;
  var req = https.get(targetUrl, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(str) {
      console.log(str);
    });
  });
}



function nstr(n){
  if(0 <= n && n <=9) return '0' + n;
  return '' + n;
}


function send2(sender, date, message){
  var postData = querystring.stringify({
    'date' : date,
    'text' : message,
    'sender' : sender
  });

  var options = {
    hostname: 'script.google.com',
    port: 443,
    path: '/macros/s/***************_***************************************/exec',
                      
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  
  var req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });
  
  req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  
  req.write(postData);
  req.end();
}





module.exports = function(robot) {
  robot.hear(/********/i, function(msg) {
    var data = msg.message.data;

    var date = new Date(data.created_at);
    var dateStr = date.getFullYear() + "/" + nstr(date.getMonth()) + "/" + nstr(date.getDate()) + " " + nstr(date.getHours()) + ":" + nstr(date.getMinutes()) + ":" + nstr(date.getSeconds());

    var sender = data.sender_name;
    var text = data.body_plain;
    send2(sender, dateStr, text);
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
