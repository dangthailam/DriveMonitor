(function () {
    var lessonPage = {
        bindings: {
            user: '<'
        },
        templateUrl: 'template/modules/lesson/lesson.html',
        controller: function ($scope, UserAPIService) {
            var self = this;

            self.onSubmit = function () {
                updateUser();
            };

            function updateUser() {
                self.user.isMonitor = true;
                UserAPIService.update(self.user.id, _.pick(self.user, ['announcement', 'phone', 'isMonitor', 'schedule']));
            }

            self.$onInit = function () {
                self.user.schedule = self.user.schedule || [{
                    day: 0,
                    ranges: []
                }, {
                    day: 1,
                    ranges: []
                }, {
                    day: 2,
                    ranges: []
                }, {
                    day: 3,
                    ranges: []
                }, {
                    day: 4,
                    ranges: []
                }, {
                    day: 5,
                    ranges: []
                }, {
                    day: 6,
                    ranges: []
                }];
            };


        }
    };

    angular.module('driveMonitor').component('lessonPage', lessonPage);
})();