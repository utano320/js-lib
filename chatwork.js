// send message to Chatwork room

// params = {
//   token: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
//   roomId: 'XXXXXXX',
//   message: 'message to send'
// }

const chatwork = (params) => {
  let https = require('https');
  let host = 'api.chatwork.com';

  let data = 'body=' + params['message'];

  let options = {
    hostname: host,
    port: 443,
    path: '/v2/rooms/' + params['roomId'] + '/messages',
    method: 'POST',
    headers: {
      'X-ChatWorkToken': params['token'],
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length
    }
  };

  let req = https.request(options, (res) => {
    console.log('status code : ' + res.statusCode);
    res.setEncoding('utf8');
    res.on('data', (d) => {
      console.log(d)
    });
  });

  req.on('error', (e) => {
    console.error(e)
  ;});

  req.write(data);
  req.end();
}

module.exports = chatwork;
