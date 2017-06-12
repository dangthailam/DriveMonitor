(function () {
    require('../announcement/announcement.model');
    
    var defaultPhotoUrl = 'http://media.npr.org/assets/news/2009/10/27/facebook1_sq-17f6f5e06d5742d8c53576f7c13d5cf7158202a9.jpg?s=16';

    angular.module('driveMonitor').factory('User', ['Announcement', function (Announcement) {
        class User {
            constructor(user) {
                this.id = user._id;
                this.roles = user.roles || [];
                this.schedule = user.schedule;
                this.announcement = user.announcement || new Announcement();

                this.email = user.email;
                this.name = user.name;
                this.phone = user.phone;
                this.birth = user.birth;
                this.imageUrl = defaultPhotoUrl;
                if (user.image && user.image.data) {
                    var u8 = new Uint8Array(user.image.data.data);
                    var b64encoded = btoa(String.fromCharCode.apply(null, u8));
                    this.imageUrl = 'data:' + user.image.contentType + ';base64,' + b64encoded;
                }
            }
        }
        return User;
    }]);

})();