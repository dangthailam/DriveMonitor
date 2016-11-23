(function () {
    "use strict";

    var registerPage = {
        templateUrl: "template/modules/register/register.html",
        controller: function ($scope, $state, UserService) {
            var self = this;

            self.credentials = {
                name: null,
                email: null,
                password: null
            };

            self.$onInit = function () {
                if (UserService.isLoggedIn()) {
                    $state.go('app.home');
                }
            }

            self.onSubmit = function () {
                UserService.register(self.credentials).then(function () {
                    $scope.$emit('onCheckAuthentication');
                    $state.go('app.home');
                });
            }
        }
    };

    angular.module('driveMonitor').component('registerPage', registerPage);
})();