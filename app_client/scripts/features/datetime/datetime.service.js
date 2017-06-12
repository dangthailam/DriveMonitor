(function () {
    var dateTimeService = function () {
        var ticsPerDay = 60 * 60 * 24 * 1000;

        var getDayHours = function () {
            var hours = [
                "06:00",
                "06:30",
                "07:00",
                "07:30",
                "08:00",
                "08:30",
                "09:00",
                "09:30",
                "10:00",
                "10:30",
                "11:00",
                "11:30",
                "12:00",
                "12:30",
                "13:00",
                "13:30",
                "14:00",
                "14:30",
                "15:00",
                "15:30",
                "16:00",
                "16:30",
                "17:00",
                "17:30",
                "18:00",
                "18:30",
                "19:00",
                "19:30",
                "20:00",
                "20:30"
            ];
            return hours;
        };

        // var getDayHours = function () {
        //     var hours = [];
        //     for (var i = 6; i <= 20; i++) {
        //         hours.splice(2 * i, 0, {
        //             hour: i,
        //             minute: 0
        //         }, {
        //             hour: i,
        //             minute: 30
        //         });
        //     }
        //     return hours;
        // };

        var getWeekDays = function (date) {
            var daysOfWeek = [{
                value: 0,
                text: 'Lundi'
            }, {
                value: 1,
                text: 'Mardi'
            }, {
                value: 2,
                text: 'Mercredi'
            }, {
                value: 3,
                text: 'Jeudi'
            }, {
                value: 4,
                text: 'Vendredi'
            }, {
                value: 5,
                text: 'Samedi'
            }, {
                value: 6,
                text: 'Dimanche'
            }];
            return daysOfWeek;
        };

        var generateNewSchedule = function () {
            return [{
                day: 0,
                ranges: [{}]
            }, {
                day: 1,
                ranges: [{}]
            }, {
                day: 2,
                ranges: [{}]
            }, {
                day: 3,
                ranges: [{}]
            }, {
                day: 4,
                ranges: [{}]
            }, {
                day: 5,
                ranges: [{}]
            }, {
                day: 6,
                ranges: [{}]
            }];
        };

        return {
            getWeekDays: getWeekDays,
            getDayHours: getDayHours,
            generateNewSchedule: generateNewSchedule
        };
    };

    angular.module('driveMonitor').service('DateTimeService', dateTimeService);
})();