(function () {
    var reservationPage = {
        bindings: {
            monitor: '<'
        },
        templateUrl: 'template/modules/reservation/reservation.html',
        controller: [function () {
            var self = this;

            self.$onInit = function () {
                console.log(self.monitor);
            };
        }]
    };

    angular.module('driveMonitor').component('reservationPage', reservationPage);
})();