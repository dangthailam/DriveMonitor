(function() {
    "use strict";

    var homePage = {
        bindings: {
            users: '<'
        },
        templateUrl: "template/modules/home/home.html",
        controller: function($scope){
            var self = this;

            console.log(self.users);
        }
    };
    angular.module('driveMonitor').component('homePage', homePage);
})();
