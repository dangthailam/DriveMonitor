(function () {

    angular.module('driveMonitor').factory('User', function () {
        var defaultPhotoUrl = 'http://media.npr.org/assets/news/2009/10/27/facebook1_sq-17f6f5e06d5742d8c53576f7c13d5cf7158202a9.jpg?s=16';

        class User {
            constructor(id, email, name, location, phone, birth, image, isMonitor, announcement, schedule) {
                this.id = id;
                this.email = email;
                this.name = name;
                this.location = location;
                this.phone = phone;
                this.birth = birth;
                this.imageUrl = (image && image.data) ? 'data:' + image.contentType + ';base64,' + image.data : defaultPhotoUrl;
                this.isMonitor = isMonitor;
                this.announcement = announcement;
                this.schedule = schedule;
            }
        }

        return User;
    });

})();