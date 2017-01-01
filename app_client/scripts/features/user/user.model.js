(function () {
    require('../announcement/announcement.model');
    require('../authentication/authentication.model');

    angular.module('driveMonitor').factory('User', ['Announcement', 'Authentication', function (Announcement, Authentication) {
        class User {
            constructor(user) {
                this.id = user._id;
                this.roles = user.roles || [];
                this.schedule = user.schedule;
                this.announcement = user.announcement || new Announcement();
                if (user.authentication) {
                    this.authentication = new Authentication(user.authentication);
                }
            }
        }
        return User;
    }]);

})();