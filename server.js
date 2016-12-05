const express = require('express');
const session = require('express-session');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require('passport');
const fs = require('fs');
const path = require('path');
const winston = require('winston');
const expressWinston = require('express-winston');

require('./app_server/config/db');

require('./app_server/config/passport');

var app = express();

app.use(expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'server.json',
      handleExceptions: true,
      humanReadableUnhandledException: true,
      colorize: true,
      json: true
    })
  ]
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());
app.use(session({
  secret: 'driveMonitor'
}));
app.use(flash());
app.use(express.static(__dirname + '/Content'));

require('./app_server/routes/index')(app);

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
var port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log('Our app is running on http://localhost:' + port);
});

module.exports = app;