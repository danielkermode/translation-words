// 'use strict';
// require('babel-core/register')({});
// var server = require('./src/server');

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, function () {
//   console.log('Server listening on', PORT);
// });



var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});