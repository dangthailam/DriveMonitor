var app = angular.module('driveMonitor', ['ui.router', 'ngFileUpload', 'ngImgCrop']);


angular.module('driveMonitor')
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('app', {
            abstract: true,
            template: "<my-app logged-in-user='user'></my-app>",
            controller: function ($scope, loggedInUser) {
                $scope.user = loggedInUser;
            },
            resolve: {
                loggedInUser: function (AuthenticationService, UserAPIService) {
                    if (AuthenticationService.isLoggedIn()) {
                        return UserAPIService.getUser(AuthenticationService.getCurrentUser().id).then(function (user) {
                            AuthenticationService.setCurrentUser(user);
                            return user;
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
                users: function (UserAPIService) {
                    return UserAPIService.getUsers(3, true);
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
                user: function ($stateParams, UserAPIService) {
                    return UserAPIService.getUser($stateParams.userId);
                }
            }
        }).state('app.profile', {
            url: "/profile",
            template: "<profile-page user='user'></profile-page>",
            forConnectedUser: true,
            controller: function ($scope, loggedInUser, AuthenticationService) {
                $scope.user = AuthenticationService.getCurrentUser();
            }
        }).state('app.lesson', {
            url: "/annonce",
            template: '<lesson-page user="user"></lesson-page>',
            forConnectedUser: true,
            controller: function ($scope, loggedInUser, AuthenticationService) {
                $scope.user = AuthenticationService.getCurrentUser();
            }
        });
    }).run(function ($rootScope, $state, AuthenticationService) {
        $rootScope.$on('$stateChangeStart', function (e, toState, toParams) {
            var isLoggedIn = AuthenticationService.isLoggedIn();
            if (toState.forConnectedUser && !isLoggedIn) {
                e.preventDefault();
                $state.transitionTo('app.login', {
                    return: toState.name ? toState.name : 'app.profile'
                });
            }
        });
    }).factory('_', function(){
        return window._;
    });


require('./components/index.js');
require('./modules/index.js');
require('./features/index.js');

angular.bootstrap(document, ['driveMonitor']);