(function () {
    var userService = ['$q', 'UserAPIService', function ($q, UserAPIService) {
        var _monitor = null;

        var getMonitor = function (monitorId) {
            var deferred = $q.defer();
            if (_monitor) deferred.resolve(_monitor);
            else if (monitorId) {
                UserAPIService.getUser(monitorId, 'authentication').then(function (user) {
                    deferred.resolve(user);
                });
            } else {
                deferred.reject();
            }
            return deferred.promise;
        };

        var setMonitor = function(monitor){
            _monitor = monitor;
        };

        return {
            getMonitor: getMonitor,
            setMonitor: setMonitor
        };
    }];

    angular.module('driveMonitor').service('UserService', userService);
})();