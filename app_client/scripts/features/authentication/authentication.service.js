(function () {
    var authenticationService = function ($http, $window, UserAPIService, User) {
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
            _currentUser = _currentUser || new User(payload._id, payload.email, payload.name);
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