(function () {
    var lessonPage = {
        bindings: {
            user: '<'
        },
        templateUrl: 'template/modules/lesson/lesson.html',
        controller: function ($scope, UserAPIService, DateTimeService, AddressService) {
            var self = this;
            var addressChanged = false;

            self.onSubmit = function () {
                updateUser();
            };

            self.addressChanged = function () {
                addressChanged = true;
            };

            function updateUser() {
                self.user.isMonitor = true;

                if (addressChanged) {
                    AddressService.getGooglePlace(self.user.announcement.location.address).then(function (location) {
                        self.user.announcement.location = location;
                        UserAPIService.update(self.user.id, _.pick(self.user, ['announcement', 'phone', 'isMonitor', 'schedule']));
                    });
                } else {
                    UserAPIService.update(self.user.id, _.pick(self.user, ['announcement', 'phone', 'isMonitor', 'schedule']));
                }
            }

            self.$onInit = function () {
                if (!self.user.schedule || !self.user.schedule.length)
                    self.user.schedule = DateTimeService.generateNewSchedule();
            };
        }
    };

    angular.module('driveMonitor').component('lessonPage', lessonPage);
})();