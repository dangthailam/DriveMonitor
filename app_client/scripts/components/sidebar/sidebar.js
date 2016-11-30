(function () {
    "use strict";

    var sidebar = {
        bindings: {
            isLoggedIn: '<'
        },
        templateUrl: "template/components/sidebar/sidebar.html",
        controller: function ($scope, UserService) {
            var self = this;

            self.avatarSrc = 'http://media.npr.org/assets/news/2009/10/27/facebook1_sq-17f6f5e06d5742d8c53576f7c13d5cf7158202a9.jpg?s=16';

            self.$onChanges = function (changes) {
                if (self.isLoggedIn) {
                    UserService.getUser(UserService.getCurrentUser()._id).then(function (user) {
                        UserService.setCurrentUser(user);
                        if (user.image && user.image.data)
                            self.avatarSrc = 'data:' + user.image.contentType + ';base64,' + user.image.data;
                    });

                }
            };

            self.logout = function () {
                UserService.logout();
                $scope.$emit('onCheckAuthentication');
            };
        }
    };

    angular.module('driveMonitor').component('sideBar', sidebar);
})();