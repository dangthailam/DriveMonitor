(function () {
    "use strict";
    var _ = require('lodash');

    var profilePage = {
        bindings: {
            user: '<'
        },
        templateUrl: "template/modules/profile/profile.html",
        controller: function ($scope, $window, $timeout, Upload, UserService) {
            var self = this;
            
            self.avatarUrl = self.user.image && self.user.image.data ?
                'data:' + self.user.image.contentType + ';base64,' + self.user.image.data :
                'http://media.npr.org/assets/news/2009/10/27/facebook1_sq-17f6f5e06d5742d8c53576f7c13d5cf7158202a9.jpg?s=16';

            self.onSubmit = function () {
                UserService.update(self.user._id, _.omit(self.user, ['_id', 'email', 'roles', 'image'])).then(function () {
                    done();
                });
            };

            self.upload = function (dataUrl, name) {
                UserService.updateProfilePicture(self.user._id, Upload.dataUrltoBlob(dataUrl, name)).then(function (response) {
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