(function () {
    var dateTimeService = function () {
        var ticsPerDay = 60 * 60 * 24 * 1000;

        var getDayHours = function () {
            var hours = [];
            for (var i = 0; i < 24; i++) {
                hours.splice(2 * i, 0, {
                    hour: i,
                    minute: 0
                }, {
                    hour: i,
                    minute: 30
                });
            }
            return hours;
        };

        var getWeekDays = function (date) {
            var daysOfWeek = [];
            for (var i = 0; i < 7; i++) {
                var today = date.setTime(date.getTime() + i * ticsPerDay);
                daysOfWeek.push(today);
            }
            return daysOfWeek;
        };

        return {
            getWeekDays: getWeekDays,
            getDayHours: getDayHours
        };
    };

    angular.module('driveMonitor').service('DateTimeService', dateTimeService);
})();