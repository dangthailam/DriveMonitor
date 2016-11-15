(function() {
    "use strict";

    var sidebarConnected = {
        templateUrl: "template/components/sidebar-connected/sidebar-connected.html",
        controller: function($scope, UserService){
            var self = this;

            self.logout = function(){
                UserService.logout();
                $scope.$emit('onCheckAuthentication');
            }
        }
    };

    angular.module('driveMonitor').component('sidebarConnected', sidebarConnected);
})();
