(function() {
    "use strict";

    var sidebar = {
        bindings: {
            isLoggedIn: '<'
        },
        templateUrl: "template/components/sidebar/sidebar.html",
        controller: function($scope, UserService) {
            var self = this;

            self.logout = function() {
                UserService.logout();
                $scope.$emit('onCheckAuthentication');
            }
        }
    };

    angular.module('driveMonitor').component('sideBar', sidebar);
})();
