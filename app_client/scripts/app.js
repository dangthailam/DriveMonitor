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
                        return UserAPIService.getUser(AuthenticationService.getCurrentUser().id, 'authentication').then(function (user) {
                            AuthenticationService.setCurrentUser(user);
                            return user;
                        });
                    }
                    return;
                }
            }
        }).state('app.home', {
            url: "/",
            template: "<home-page></home-page>"
        }).state('app.login', {
            url: "/login?return&params",
            template: "<login-page></login-page>"
        }).state('app.register', {
            url: "/register",
            template: "<register-page></register-page>"
        }).state('app.monitor', {
            url: "/monitor/:userId",
            template: "<monitor-page monitor='monitor'></monitor-page>",
            controller: function ($scope, monitor) {
                $scope.monitor = monitor;
            },
            resolve: {
                monitor: function ($stateParams, UserAPIService) {
                    return UserAPIService.getUser($stateParams.userId, 'authentication');
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
        }).state('app.search', {
            url: "/search?location",
            template: '<search-page result="result"></search-page>',
            controller: function ($scope, result) {
                $scope.result = result;
            },
            resolve: {
                result: ['_', '$stateParams', 'AddressService', 'UserAPIService', 'User', function (_, $stateParams, AddressService, UserAPIService, User) {
                    if (!$stateParams.location) return null;
                    return AddressService.getGooglePlace($stateParams.location).then(function (location) {
                        return UserAPIService.search(location.address, 10, 1).then(function (result) {
                            return {
                                found: result.data.found,
                                total: result.data.total,
                                users: _.map(result.data.users, function (u) {
                                    return new User(u);
                                }),
                                geocode: {
                                    latitude: location.address.geoLatitude,
                                    longtitude: location.address.geoLongtitude
                                },
                                viewport: location.viewport
                            };
                        });
                    });
                }]
            }
        }).state('app.reserve', {
            url: "/reserve?monitorId",
            template: "<reservation-page monitor='monitor'></reservation-page>",
            controller: ['$scope', 'monitor', function ($scope, monitor) {
                $scope.monitor = monitor;
            }],
            resolve: {
                monitor: ['$stateParams', 'UserService', function ($stateParams, UserService) {
                    return UserService.getMonitor($stateParams.monitorId);
                }]
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
    }).factory('_', function () {
        return window._;
    });


require('./components/index.js');
require('./modules/index.js');
require('./features/index.js');

angular.bootstrap(document, ['driveMonitor']);