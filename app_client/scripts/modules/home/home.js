(function() {
    "use strict";

    var homePage = {
        bindings: {
            users: '<'
        },
        templateUrl: "template/modules/home/home.html",
        controller: function($scope, User){
            var self = this;
        }
    };
    angular.module('driveMonitor').component('homePage', homePage);
})();
