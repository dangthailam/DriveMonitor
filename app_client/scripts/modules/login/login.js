(function () {
    "use strict";

    var loginPage = {
        templateUrl: "template/modules/login/login.html",
        controller: function ($scope, $location, $stateParams, UserAPIService, UserService) {
            var self = this;

            self.credentials = {
                email: null,
                password: null
            };

            self.$onInit = function () {
                if (UserService.isLoggedIn()) {
                    $location.url('/home');
                }
            };

            self.onSubmit = function () {
                UserService.login(self.credentials).then(function () {
                    UserAPIService.getUser(UserService.getCurrentUser().id, 'authentication').then(function (user) {
                        UserService.setCurrentUser(user);
                        $scope.$emit('onCheckAuthentication');
                        if ($stateParams.return) {
                            $location.url($stateParams.return);
                        } else {
                            $location.url('/home');
                        }
                    });
                });
            };
        }
    };

    angular.module('driveMonitor').component('loginPage', loginPage);
})();