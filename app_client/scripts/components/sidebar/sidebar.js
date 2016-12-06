(function () {
    "use strict";

    var sidebar = {
        bindings: {
            isLoggedIn: '<',
            loggedInUser: '<'
        },
        templateUrl: "template/components/sidebar/sidebar.html",
        controller: function ($scope, AuthenticationService) {
            var self = this;

            self.avatarSrc = 'http://media.npr.org/assets/news/2009/10/27/facebook1_sq-17f6f5e06d5742d8c53576f7c13d5cf7158202a9.jpg?s=16';

            self.$onChanges = function (changes) {
                if (self.isLoggedIn && self.loggedInUser.image && self.loggedInUser.image.data) {
                    self.avatarSrc = 'data:' + self.loggedInUser.image.contentType + ';base64,' + self.loggedInUser.image.data;
                }
            };

            self.logout = function () {
                AuthenticationService.logout();
                $scope.$emit('onCheckAuthentication');
            };
        }
    };

    angular.module('driveMonitor').component('sideBar', sidebar);
})();