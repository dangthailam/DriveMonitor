(function () {
    var userAPIService = function ($http, $window, $q, _, Upload, User) {
        var update = function (userId, user) {
            return $http.patch('/users/' + userId, user);
        };

        var getUsers = function (quantity, isMonitor) {
            return $http({
                url: '/users',
                method: "GET",
                params: {
                    quantity: quantity,
                    isMonitor: isMonitor
                }
            }).then(function (result) {
                return _.map(result.data, function(u){
                    return new User(u._id, u.email, u.name, u.location, u.phone, u.birth, u.image, u.isMonitor, u.announcement);
                });
            });
        };

        var getUser = function (userId) {
            return $http({
                url: '/users/' + userId,
                method: "GET"
            }).then(function (result) {
                var u = result.data;
                return new User(u._id, u.email, u.name, u.location, u.phone, u.birth, u.image, u.isMonitor, u.announcement);
            });
        };

        var updateProfilePicture = function (userId, blob) {
            return Upload.upload({
                url: '/users/' + userId,
                method: 'POST',
                file: blob
            });
        };

        var register = function (user) {
            return $http.post('/users', user);
        };

        var login = function (user) {
            return $http.post('/token', user);
        };

        return {
            update: update,
            getUsers: getUsers,
            getUser: getUser,
            updateProfilePicture: updateProfilePicture,
            register: register,
            login: login
        };
    };

    angular.module('driveMonitor').service('UserAPIService', userAPIService);
})();