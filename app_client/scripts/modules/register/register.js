(function () {
    "use strict";

    var registerPage = {
        templateUrl: "template/modules/register/register.html",
        controller: function ($scope, $state, AuthenticationService) {
            var self = this;

            self.credentials = {
                name: null,
                email: null,
                password: null
            };

            self.$onInit = function () {
                if (AuthenticationService.isLoggedIn()) {
                    $state.go('app.home');
                }
            };

            self.registerAsStudent = function () {
                AuthenticationService.register(self.credentials).then(function () {
                    $scope.$emit('onCheckAuthentication');
                    $state.go('app.home');
                });
            };

            self.registerAsMonitor = function () {
                AuthenticationService.register(self.credentials).then(function () {
                    $scope.$emit('onCheckAuthentication');
                    $state.go('app.lesson');
                });
            };
        }
    };

    angular.module('driveMonitor').component('registerPage', registerPage);
})();