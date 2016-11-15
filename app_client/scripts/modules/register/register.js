(function() {
    "use strict";

    var registerPage = {
        templateUrl: "template/modules/register/register.html",
        controller: function($location, UserService){
            var self = this;

            self.credentials = {
                name: null,
                email: null,
                password: null
            };

            self.onSubmit = function(){
                UserService.register(self.credentials).then(function(){
                    $location.path('/');
                });
            }
        }
    };

    angular.module('driveMonitor').component('registerPage', registerPage);
})();
