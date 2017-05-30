(function () {
    "use strict";
    var _ = require('lodash');

    var profilePage = {
        bindings: {
            user: '<'
        },
        templateUrl: "template/modules/profile/profile.html",
        controller: function ($scope, $window, $timeout, Upload, UserService, UserAPIService) {
            var self = this;

            console.log(self.user);

            self.onSubmit = function () {
                UserAPIService.update(self.user.id, _.pick(self.user, ['name', 'phone'])).then(function () {
                    done();
                });
            };

            self.upload = function (dataUrl, name) {
                UserAPIService.updateProfilePicture(self.user.id, Upload.dataUrltoBlob(dataUrl, name)).then(function (response) {
                    done();
                });
            };

            function done() {
                self.doneSaving = true;
                $timeout(function () {
                    self.doneSaving = false;
                }, 2000);
            }
        }
    };

    angular.module('driveMonitor').component('profilePage', profilePage);
})();