(function () {
    require('../announcement/announcement.model');

    angular.module('driveMonitor').factory('User', ['Announcement', function (Announcement) {
        var defaultPhotoUrl = 'http://media.npr.org/assets/news/2009/10/27/facebook1_sq-17f6f5e06d5742d8c53576f7c13d5cf7158202a9.jpg?s=16';

        class User {
            constructor(id, email, name, roles, announcement, schedule, authentication) {
                this.id = id;
                this.email = email;
                this.name = name;
                this.roles = roles || [];
                this.schedule = schedule;
                this.announcement = announcement || new Announcement();

                if (authentication) {
                    this.phone = authentication.phone;
                    this.birth = authentication.birth;
                    this.imageUrl = defaultPhotoUrl;
                    if (authentication.image && authentication.image.data) {
                        var base64 = new Buffer(authentication.image.data.data).toString('base64');
                        this.imageUrl = 'data:' + authentication.image.contentType + ';base64,' + base64;
                    }
                }
            }
        }

        return User;
    }]);

})();