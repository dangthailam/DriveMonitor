(function () {
    "use strict";

    var monitorPage = {
        bindings: {
            monitor: '<'
        },
        templateUrl: "template/modules/monitor/monitor.html",
        controller: ['$state', 'UserService', 'UserAPIService', 'AuthenticationService', function ($state, UserService, UserAPIService, AuthenticationService) {
            var self = this;

            self.reserve = function () {
                UserService.setMonitor(self.monitor);
                $state.go('app.reserve', {
                    monitorId: self.monitor.id
                });
            };

            self.$onInit = function () {
                console.log(self.monitor);
            };
        }]
    };

    angular.module('driveMonitor').component('monitorPage', monitorPage);
})();