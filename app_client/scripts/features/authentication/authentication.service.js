(function () {
    var authenticationService = function ($http, $window) {
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
            if (token) {
                var payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);

                _currentUser = _currentUser || {
                    _id: payload._id,
                    email: payload.email,
                    name: payload.name
                };

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        var register = function (user) {
            return $http.post('/users', user).success(function (data) {
                saveToken(data.token);
            });
        };

        var login = function (user) {
            return $http.post('/token', user).success(function (data) {
                saveToken(data.token);
            });
        };

        var logout = function () {
            $window.localStorage.removeItem('mean-token');
        };

        return {
            saveToken: saveToken,
            getToken: getToken,
            isLoggedIn: isLoggedIn,
            register: register,
            login: login,
            logout: logout,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        };
    };

    angular.module('driveMonitor').service('AuthenticationService', authenticationService);

})();