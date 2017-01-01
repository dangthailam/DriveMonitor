(function () {
    "use strict";
    var _ = require('lodash');

    var profilePage = {
        bindings: {
            user: '<'
        },
        templateUrl: "template/modules/profile/profile.html",
        controller: function ($scope, $window, $timeout, Upload, AuthenticationService, UserAPIService) {
            var self = this;

            self.onSubmit = function () {
                AuthenticationService.update(self.user.authentication.id, _.pick(self.user.authentication, ['name', 'phone'])).then(function () {
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