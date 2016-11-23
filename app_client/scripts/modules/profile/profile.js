(function() {
    "use strict";
    var _ = require('lodash');

    var profilePage = {
        bindings: {
            user: '<'
        },
        templateUrl: "template/modules/profile/profile.html",
        controller: function($scope, $window, UserService) {
            var self = this;
            
            self.onSubmit = function() {
                UserService.update(_.omit(self.user, ['_id', 'email', 'roles', 'created_at', 'updated_at']));
            };
        }
    };

    angular.module('driveMonitor').component('profilePage', profilePage);
})();
