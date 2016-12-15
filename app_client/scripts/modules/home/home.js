(function () {
    "use strict";

    var homePage = {
        bindings: {
            users: '<'
        },
        templateUrl: "template/modules/home/home.html",
        controller: ['$scope', 'UserAPIService', 'User', function ($scope, UserAPIService, User) {
            var self = this;

            self.onSubmit = function () {
                UserAPIService.search(self.searchPlace, 10, 1).then(function (result) {
                    console.log(result);
                });
            };
        }]
    };
    angular.module('driveMonitor').component('homePage', homePage);
})();