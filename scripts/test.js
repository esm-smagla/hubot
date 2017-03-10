var http = require('https');

var targetUrl = 'https://script.google.com/macros/s/AKfycbyF7T2AQqWGwgcBaJeScIUuT1n8B_Ow9WiXV_XtnDCDwjnqIKGb/exec?kind=HOGE2';

var req = http.get(targetUrl, function(res) {
  // output response body
  res.setEncoding('utf8');
  res.on('data', function(str) {
    console.log(str);
  });
});
