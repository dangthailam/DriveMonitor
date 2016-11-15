var express = require('express');
var session = require('express-session');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var passport = require('passport');

require('./app_server/config/db');

require('./app_server/config/passport');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(session({
    secret: 'driveMonitor'
}));
app.use(flash());
app.use(express.static(__dirname + '/Content'));

require('./app_server/routes/index')(app);

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(8080);
console.log('App listen at port: 8080');

module.exports = app;
