(function () {
    "use strict";

    var monitorPage = {
        bindings: {
            user: '<'
        },
        templateUrl: "template/modules/monitor/monitor.html",
        controller: function ($location, UserAPIService) {
            var self = this;

            self.avatarUrl = self.user.image && self.user.image.data ?
                'data:' + self.user.image.contentType + ';base64,' + self.user.image.data :
                'http://media.npr.org/assets/news/2009/10/27/facebook1_sq-17f6f5e06d5742d8c53576f7c13d5cf7158202a9.jpg?s=16';
        }
    };

    angular.module('driveMonitor').component('monitorPage', monitorPage);
})();