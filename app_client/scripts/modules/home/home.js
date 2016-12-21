(function () {
    "use strict";

    var homePage = {
        bindings: {
            users: '<'
        },
        templateUrl: "template/modules/home/home.html",
        controller: ['$scope', '$state', 'UserAPIService', 'AddressService', 'User', function ($scope, $state, UserAPIService, AddressService, User) {
            var self = this;

            self.onSubmit = function () {
                $state.transitionTo('app.search', {
                    location: self.searchPlace
                });
            };
        }]
    };
    angular.module('driveMonitor').component('homePage', homePage);
})();