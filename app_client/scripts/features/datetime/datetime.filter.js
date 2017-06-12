(function () {
    var displayHour = function () {
        return function (hour) {
            return `${hour.hour > 9 ? hour.hour : '0' + hour.hour}:${hour.minute === 0 ? '00' : '30'}`;
        };
    };

    var displayDate = function () {
        return function (date) {
            switch (date) {
                case 0:
                    return "Lundi";
                case 1:
                    return "Mardi";
                case 2:
                    return "Mercredi";
                case 3:
                    return "Jeudi";
                case 4:
                    return "Vendredi";
                case 5:
                    return "Samedi";
                case 6:
                    return "Dimanche";
            }
        };
    };

    angular.module('driveMonitor').filter('displayHour', displayHour).filter('displayDate', displayDate);
})();