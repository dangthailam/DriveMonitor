(function () {
    "use strict";

    var loginPage = {
        templateUrl: "template/modules/login/login.html",
        controller: function ($scope, $state, $stateParams, UserAPIService, AuthenticationService) {
            var self = this;

            self.credentials = {
                email: null,
                password: null
            };

            self.$onInit = function () {
                if (AuthenticationService.isLoggedIn()) {
                    $state.go('app.home');
                }
            };

            self.onSubmit = function () {
                AuthenticationService.login(self.credentials).then(function () {
                    UserAPIService.getUser(AuthenticationService.getCurrentUser().id, 'authentication').then(function (user) {
                        AuthenticationService.setCurrentUser(user);
                        $scope.$emit('onCheckAuthentication');
                        if ($stateParams.return) {
                            $state.go($stateParams.return, $stateParams.params);
                        } else {
                            $state.go('app.home');
                        }
                    });
                });
            };
        }
    };

    angular.module('driveMonitor').component('loginPage', loginPage);
})();