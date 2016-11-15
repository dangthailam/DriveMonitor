(function() {
    var myApp = {
        bindings: {
            isLoggedIn: '<'
        },
        templateUrl: 'template/modules/app/myApp.html',
        controller: function($scope, UserService) {
            var self = this;

            $scope.$on('onCheckAuthentication', function(e) {
                self.isLoggedIn = UserService.isLoggedIn();
            });
            self.isLoggedIn = UserService.isLoggedIn();
        }
    }

    angular.module('driveMonitor').component('myApp', myApp);
})();
