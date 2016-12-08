(function () {
    var myApp = {
        bindings: {
            isLoggedIn: '<',
            loggedInUser: '<'
        },
        templateUrl: 'template/modules/app/myApp.html',
        controller: function ($scope, AuthenticationService) {
            var self = this;
            $scope.$on('onCheckAuthentication', function (e) {
                self.isLoggedIn = AuthenticationService.isLoggedIn();
                self.loggedInUser = AuthenticationService.getCurrentUser();
            });
            self.isLoggedIn = AuthenticationService.isLoggedIn();
        }
    };

    angular.module('driveMonitor').component('myApp', myApp);
})();