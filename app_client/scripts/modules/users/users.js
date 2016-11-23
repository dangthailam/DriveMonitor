(function() {
    "use strict";

    var usersPage = {
        templateUrl: "template/modules/users/users.html",
        controller: function($location, UserService){
            var self = this;
        }
    };

    angular.module('driveMonitor').component('usersPage', usersPage);
})();
