(function () {
    var lessonPage = {
        bindings: {
            user: '<'
        },
        templateUrl: 'template/modules/lesson/lesson.html',
        controller: function ($scope, UserAPIService, DateTimeService, AddressService) {
            var self = this;
            var addressChanged = false;
            console.log(self.user);
            self.onSubmit = function () {
                updateUser();
            };

            self.addressChanged = function () {
                addressChanged = true;
            };

            function updateUser() {
                if (self.user.roles.indexOf('Monitor') === -1) {
                    self.user.roles.push('Monitor');
                }

                if (addressChanged) {
                    AddressService.getGooglePlace(self.user.announcement.location.address).then(function (location) {
                        self.user.announcement.location = location.address;
                        UserAPIService.update(self.user.id, _.pick(self.user, ['announcement', 'phone', 'roles', 'schedule']));
                    });
                } else {
                    UserAPIService.update(self.user.id, _.pick(self.user, ['announcement', 'phone', 'roles', 'schedule']));
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