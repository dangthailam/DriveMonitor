var userService = function($http, $window, $q) {
    var _currentUser = null;

    var saveToken = function(token) {
        $window.localStorage['mean-token'] = token;
    };

    var getToken = function() {
        return $window.localStorage['mean-token'];
    };

    var isLoggedIn = function() {
        var token = getToken();
        if (token) {
            var payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);

            _currentUser = {
                id: payload._id,
                email: payload.email,
                name: payload.name
            };

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    var currentUser = function() {
        if (isLoggedIn()) {
            return _currentUser;
        }
    };

    var register = function(user) {
        return $http.post('/users', user).success(function(data) {
            saveToken(data.token);
        });
    };

    var login = function(user) {
        return $http.post('/token', user).success(function(data) {
            saveToken(data.token);
        });
    };

    var logout = function() {
        $window.localStorage.removeItem('mean-token');
    };

    var getLoggedUserInfo = function() {
        return $http.get('/users/' + _currentUser.id).then(function(result) {
            return result.data;
        });
    };

    var update = function(user) {
        return $http.patch('/users/' + _currentUser.id, user);
    };

    var getAllUsers = function(){
        return $http.get('/users').then(function(result){
            return result.data;
        });
    };

    return {
        currentUser: currentUser,
        saveToken: saveToken,
        getToken: getToken,
        isLoggedIn: isLoggedIn,
        register: register,
        login: login,
        logout: logout,
        getLoggedUserInfo: getLoggedUserInfo,
        update: update,
        getAllUsers: getAllUsers
    };
};

angular.module('driveMonitor').service('UserService', userService);
