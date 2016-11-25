angular.module('driveMonitor')
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('app', {
            abstract: true,
            template: "<my-app></my-app>"
        }).state('app.home', {
            url: "/",
            template: "<home-page users='users'></home-page>",
            controller: function ($scope, users) {
                $scope.users = users;
            },
            resolve: {
                users: function (UserService) {
                    return UserService.getUsers(6);
                }
            }
        }).state('app.login', {
            url: "/login?return",
            template: "<login-page></login-page>"
        }).state('app.register', {
            url: "/register",
            template: "<register-page></register-page>"
        }).state('app.monitor', {
            url: "/monitor?userId",
            template: "<monitor-page user='user'></monitor-page>",
            controller: function($scope, user){
                $scope.user = user;
            },
            resolve: {
                user: function($stateParams, UserService){
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
                user: function (UserService) {
                    return UserService.getLoggedUserInfo();
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