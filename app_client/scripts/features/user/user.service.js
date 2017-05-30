(function () {
    var userService = ['$q', '$window', 'UserAPIService', 'User', function ($q, $window, UserAPIService, User) {
        var _monitor = null;
        var _currentUser = null;

        var saveToken = function (token) {
            $window.localStorage['mean-token'] = token;
        };

        var getToken = function () {
            return $window.localStorage['mean-token'];
        };

        var setCurrentUser = function (user) {
            _currentUser = user;
        };

        var getCurrentUser = function () {
            return _currentUser;
        };

        var isLoggedIn = function () {
            var token = getToken();
            if (!token) return false;
            var payload = parseTokenAndSetCurrentUser(token);
            return payload.exp > Date.now() / 1000;
        };

        function parseTokenAndSetCurrentUser(token) {
            var payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);
            _currentUser = _currentUser || new User({
                _id: payload._id
            });
            return payload;
        }

        var register = function (user) {
            return UserAPIService.register(user).then(function (response) {
                saveToken(response.data.token);
            });
        };

        var login = function (user) {
            return UserAPIService.login(user).then(function (response) {
                saveToken(response.data.token);
                parseTokenAndSetCurrentUser(response.data.token);
            });
        };

        var logout = function () {
            $window.localStorage.removeItem('mean-token');
            _currentUser = null;
        };

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
            setMonitor: setMonitor,
            saveToken: saveToken,
            getToken: getToken,
            isLoggedIn: isLoggedIn,
            register: register,
            login: login,
            logout: logout,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        };
    }];

    angular.module('driveMonitor').service('UserService', userService);
})();