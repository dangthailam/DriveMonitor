(function () {
    var userService = function ($http, $window, $q, Upload) {
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
                return result.data;
            });
        };

        var getUser = function (userId) {
            return $http({
                url: '/users/' + userId,
                method: "GET"
            }).then(function (result) {
                return result.data;
            });
        };

        var updateProfilePicture = function (userId, blob) {
            return Upload.upload({
                url: '/users/' + userId,
                method: 'POST',
                file: blob
            });
        };

        return {
            update: update,
            getUsers: getUsers,
            getUser: getUser,
            updateProfilePicture: updateProfilePicture
        };
    };

    angular.module('driveMonitor').service('UserService', userService);
})();