(function () {
    var displayHour = function () {
        return function (hour) {
            return `${hour.hour > 9 ? hour.hour : '0' + hour.hour}:${hour.minute === 0 ? '00' : '30'}`;
        };
    };

    angular.module('driveMonitor').filter('displayHour', displayHour);
})();