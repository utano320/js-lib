// send incoming webhooks notification to Slack channel

// params = {
//   path: '/services/TXXXXXXXX/BXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXX',
//   message: 'message to send'
// }

const slack = (params) => {
  let https = require('https');
  let host = 'hooks.slack.com';

  let data = JSON.stringify({"text": params['message']});

  let options = {
    hostname: host,
    port: 443,
    path: params['path'],
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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

module.exports = slack;
