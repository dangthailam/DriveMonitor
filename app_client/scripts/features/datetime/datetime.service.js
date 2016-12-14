(function () {
    var dateTimeService = function () {
        var ticsPerDay = 60 * 60 * 24 * 1000;

        var getDayHours = function () {
            var hours = [];
            for (var i = 0; i < 24; i++) {
                hours.splice(2 * i, 0, {
                    hour: i,
                    minute: 0,
                    show: true
                }, {
                    hour: i,
                    minute: 30,
                    show: false
                });
            }
            return hours;
        };

        var getWeekDays = function (date) {
            var daysOfWeek = [
                {
                    value: 0,
                    text: 'Lun'
                },
                {
                    value: 1,
                    text: 'Mar'
                },
                {
                    value: 2,
                    text: 'Mer'
                },
                {
                    value: 3,
                    text: 'Jeu'
                },
                {
                    value: 4,
                    text: 'Ven'
                },
                {
                    value: 5,
                    text: 'Sam'
                },
                {
                    value: 6,
                    text: 'Dim'
                }
            ];
            return daysOfWeek;
        };

        return {
            getWeekDays: getWeekDays,
            getDayHours: getDayHours
        };
    };

    angular.module('driveMonitor').service('DateTimeService', dateTimeService);
})();