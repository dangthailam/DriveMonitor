(function () {
    var myApp = {
        bindings: {
            isLoggedIn: '<',
            loggedInUser: '<'
        },
        templateUrl: 'template/modules/app/myApp.html',
        controller: function ($scope, UserService) {
            var self = this;
            $scope.$on('onCheckAuthentication', function (e) {
                self.isLoggedIn = UserService.isLoggedIn();
                self.loggedInUser = UserService.getCurrentUser();
            });

            self.$onInit = function () {
                self.isLoggedIn = UserService.isLoggedIn();
            };
        }
    };

    angular.module('driveMonitor').component('myApp', myApp);
})();