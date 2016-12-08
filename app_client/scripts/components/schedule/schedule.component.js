(function () {
    var schedule = {
        bindings: {
            schedule: '<'
        },
        templateUrl: function ($attrs) {
            if ($attrs.canEdit === 'true')
                return 'template/components/schedule/schedule-edit.html';
            return 'template/components/schedule/schedule.html';
        },
        controller: ['$filter', 'DateTimeService', function ($filter, DateTimeService) {
            var self = this;

            self.$onInit = function () {
                self.weekDays = DateTimeService.getWeekDays(new Date());
                self.dayHours = DateTimeService.getDayHours();
            };

        }]
    };

    angular.module('driveMonitor').component('schedule', schedule);
})();