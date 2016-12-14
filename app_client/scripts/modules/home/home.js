(function () {
    "use strict";

    var homePage = {
        bindings: {
            users: '<'
        },
        templateUrl: "template/modules/home/home.html",
        controller: ['$scope', 'User', function ($scope, User) {
            var self = this;

            self.onSubmit = function () {
                console.log(self.searchPlace);
            };
        }]
    };
    angular.module('driveMonitor').component('homePage', homePage);
})();