var app = angular.module('driveMonitor', ['ui.router', 'ngFileUpload', 'ngImgCrop']);


angular.module('driveMonitor')
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('app', {
            abstract: true,
            template: "<my-app></my-app>",
            resolve: {
                loggedInUser: function (UserService) {
                    if (UserService.isLoggedIn()) {
                        return UserService.getUser(UserService.getCurrentUser()._id).then(function (user) {
                            UserService.setCurrentUser(user);
                        });
                    }
                    return;
                }
            }
        }).state('app.home', {
            url: "/",
            template: "<home-page users='users'></home-page>",
            controller: function ($scope, users) {
                $scope.users = users;
            },
            resolve: {
                users: function (UserService) {
                    return UserService.getUsers(3).then(function (users) {
                        _.forEach(users, function (user) {
                            user.imageUrl = (user.image && user.image.data) ? 'data:' + user.image.contentType + ';base64,' + user.image.data : 'http://media.npr.org/assets/news/2009/10/27/facebook1_sq-17f6f5e06d5742d8c53576f7c13d5cf7158202a9.jpg?s=16';
                        });
                        return users;
                    });
                }
            }
        }).state('app.login', {
            url: "/login?return",
            template: "<login-page></login-page>"
        }).state('app.register', {
            url: "/register",
            template: "<register-page></register-page>"
        }).state('app.monitor', {
            url: "/monitor/:userId",
            template: "<monitor-page user='user'></monitor-page>",
            controller: function ($scope, user) {
                $scope.user = user;
            },
            resolve: {
                user: function ($stateParams, UserService) {
                    return UserService.getUser($stateParams.userId);
                }
            }
        }).state('app.profile', {
            url: "/profile",
            template: "<profile-page user='user'></profile-page>",
            forConnectedUser: true,
            controller: function ($scope, user) {
                $scope.user = user;
            },
            resolve: {
                user: function (loggedInUser, UserService) {
                    return UserService.getUser(UserService.getCurrentUser()._id);
                }
            }
        });
    }).run(function ($rootScope, $state, UserService) {
        $rootScope.$on('$stateChangeStart', function (e, toState, toParams) {
            if (toState.forConnectedUser && !UserService.isLoggedIn()) {
                e.preventDefault();
                $state.transitionTo('app.login', {
                    return: 'app.profile'
                });
            }
        });
    });


require('./components/index.js');
require('./modules/index.js');
require('./features/index.js');

angular.bootstrap(document, ['driveMonitor']);