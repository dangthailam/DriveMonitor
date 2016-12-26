(function () {
    "use strict";

    var sidebar = {
        bindings: {
            isLoggedIn: '<',
            loggedInUser: '<'
        },
        templateUrl: "template/components/sidebar/sidebar.html",
        controller: function ($scope, AuthenticationService) {
            var self = this;

            self.logout = function () {
                AuthenticationService.logout();
                $scope.$emit('onCheckAuthentication');
            };

            self.$onInit = function(){
                console.log(self.isLoggedIn);
                console.log(self.loggedInUser);
            };
        }
    };

    angular.module('driveMonitor').component('sideBar', sidebar);
})();