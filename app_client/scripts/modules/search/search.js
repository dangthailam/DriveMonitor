(function () {
    var searchPage = {
        bindings: {
            result: '<'
        },
        templateUrl: 'template/modules/search/search.html',
        controller: ['$stateParams', function($stateParams){
            var self = this;

            self.$onInit = function(){
                self.location = $stateParams.location;
                console.log('search page', self.result);
            };
        }]
    };

    angular.module('driveMonitor').component('searchPage', searchPage);
})();