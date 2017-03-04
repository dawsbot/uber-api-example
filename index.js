const Uber = require('node-uber');
const url = require('url');
const express = require('express')
const app = express()
const port = 3000;

const uber = new Uber({
  client_id: 'replaceMe',
  client_secret: 'replaceMe',
  server_token: 'replaceMe',
  redirect_uri: 'replaceMe',
  name: 'replaceMe',
  language: 'en_US', // optional, defaults to en_US
  sandbox: true // optional, defaults to false
});


app.get('/api/callback', function(request, response) {
  uber.authorization({ authorization_code: request.query.code },
    function (err, accessToken, refreshToken) {
      if (err) {
        throw err;
      }
      uber.user.getHistory(0, 50, function(err, response) {
        console.log('response.history: ', response.history);
      });
    });
});

app.get('/api/login', function(request, response) {
  const redirectUrl = uber.getAuthorizeUrl(['history_lite']);
  response.redirect(redirectUrl);
});

app.listen(port, function () {
  console.log(`http://localhost:${port}`);
})
