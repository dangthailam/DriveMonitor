(function () {
    var userAPIService = function ($http, $window, $q, _, Upload, User) {
        var update = function (userId, user) {
            return $http.patch('/users/' + userId, user);
        };

        var getUsers = function (quantity, role) {
            return $http({
                url: '/users',
                method: "GET",
                params: {
                    quantity: quantity,
                    role: role
                }
            }).then(function (result) {
                return _.map(result.data, function (u) {
                    return new User(u._id, u.email, u.name, u.roles, u.announcement, u.schedule, u.authentication);
                });
            });
        };

        var getUser = function (userId, authenticationIncluded) {
            return $http({
                url: '/users/' + userId,
                method: "GET",
                params: {
                    authenticationIncluded: authenticationIncluded
                }
            }).then(function (result) {
                var u = result.data;
                var user = new User(u._id, u.email, u.name, u.roles, u.announcement, u.schedule, u.authentication);
                return user;
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

        var search = function (query, quantityPerPage, pageNumber) {
            query.quantityPerPage = quantityPerPage;
            query.pageNumber = pageNumber;
            return $http({
                url: '/users',
                method: "GET",
                params: query
            }).then(function (result) {
                return result;
            });
        };

        return {
            update: update,
            getUsers: getUsers,
            getUser: getUser,
            search: search,
            updateProfilePicture: updateProfilePicture,
            register: register,
            login: login
        };
    };

    angular.module('driveMonitor').service('UserAPIService', userAPIService);
})();