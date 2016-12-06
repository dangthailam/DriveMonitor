(function() {
    "use strict";

    var loginPage = {
        templateUrl: "template/modules/login/login.html",
        controller: function($scope, $state, $stateParams, AuthenticationService) {
            var self = this;

            self.credentials = {
                email: null,
                password: null
            };

            self.$onInit = function(){
                if(AuthenticationService.isLoggedIn()){
                    $state.go('app.home');
                }
            };

            self.onSubmit = function() {
                AuthenticationService.login(self.credentials).then(function() {
                    $scope.$emit('onCheckAuthentication');
                    if ($stateParams.return) {
                        $state.go($stateParams.return);
                    } else {
                        $state.go('app.home');
                    }
                });
            }
        }
    };

    angular.module('driveMonitor').component('loginPage', loginPage);
})();
