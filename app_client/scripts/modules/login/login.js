(function () {
    "use strict";

    var loginPage = {
        templateUrl: "template/modules/login/login.html",
        controller: function ($scope, $location, $stateParams, UserAPIService, AuthenticationService) {
            var self = this;

            self.credentials = {
                email: null,
                password: null
            };

            self.$onInit = function () {
                if (AuthenticationService.isLoggedIn()) {
                    $location.url('/home');
                }
            };

            self.onSubmit = function () {
                AuthenticationService.login(self.credentials).then(function () {
                    UserAPIService.getUser(AuthenticationService.getCurrentUser().id, 'authentication').then(function (user) {
                        AuthenticationService.setCurrentUser(user);
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