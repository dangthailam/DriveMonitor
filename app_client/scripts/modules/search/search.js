(function () {
    var searchPage = {
        bindings: {
            result: '<'
        },
        templateUrl: 'template/modules/search/search.html',
        controller: function(){
            var self = this;

            

            console.log(self.result);
        }
    };

    angular.module('driveMonitor').component('searchPage', searchPage);
})();