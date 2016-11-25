(function () {
    "use strict";

    var monitorPage = {
        bindings: {
            user: '<'
        },
        templateUrl: "template/modules/monitor/monitor.html",
        controller: function ($location, UserService) {
            var self = this;
        }
    };

    angular.module('driveMonitor').component('monitorPage', monitorPage);
})();