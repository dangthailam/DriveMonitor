(function () {
    var lessonPage = {
        bindings: {
            user: '<'
        },
        templateUrl: 'template/modules/lesson/lesson.html',
        controller: function (UserService) {
            var self = this;
            console.log(self.user);
            self.onSubmit = function () {
                self.user.isMonitor = true;
                UserService.update(self.user._id, _.pick(self.user, ['announcement', 'phone', 'isMonitor'])).then(function () {
                    
                });
            };
        }
    };

    angular.module('driveMonitor').component('lessonPage', lessonPage);
})();