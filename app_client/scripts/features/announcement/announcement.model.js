(function () {
    require('../address/address.model');

    angular.module('driveMonitor').factory('Announcement', ['Address', function (Address) {
        class Announcement {
            constructor(title, description, rate, location) {
                this.title = title;
                this.description = description;
                this.rate = rate;
                this.location = location || new Address();
            }
        }

        return Announcement;
    }]);
})();