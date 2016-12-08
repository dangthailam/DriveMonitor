(function () {
    var lessonPage = {
        bindings: {
            user: '<'
        },
        templateUrl: 'template/modules/lesson/lesson.html',
        controller: function (UserAPIService) {
            var self = this;
            
            self.onSubmit = function () {
                self.user.isMonitor = true;
                UserAPIService.update(self.user.id, _.pick(self.user, ['announcement', 'phone', 'isMonitor']));
            };
        }
    };

    angular.module('driveMonitor').component('lessonPage', lessonPage);
})();