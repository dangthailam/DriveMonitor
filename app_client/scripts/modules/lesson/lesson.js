(function () {
    var lessonPage = {
        bindings: {
            user: '<'
        },
        templateUrl: 'template/modules/lesson/lesson.html',
        controller: function ($scope, UserAPIService, DateTimeService) {
            var self = this;

            self.onSubmit = function () {
                updateUser();
            };

            function updateUser() {
                self.user.isMonitor = true;
                UserAPIService.update(self.user.id, _.pick(self.user, ['announcement', 'phone', 'isMonitor', 'schedule']));
            }

            self.$onInit = function () {
                if(!self.user.schedule || !self.user.schedule.length)
                    self.user.schedule = DateTimeService.generateNewSchedule();
            };
        }
    };

    angular.module('driveMonitor').component('lessonPage', lessonPage);
})();