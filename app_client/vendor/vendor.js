require('angular');
require('angular-ui-router');

jQuery = require('jQuery');
$ = require('jQuery');

require('./bootstrap.js');
require('./ripples.js');
require('./material.js');

var app = angular.module('driveMonitor', ['ui.router']);

//If there is problem, add "arrive.js" before material.js (npm install arrive --save-dev)
$(document).ready(function(){
    setTimeout(function(){
        $.material.init();
    }, 10);
});
