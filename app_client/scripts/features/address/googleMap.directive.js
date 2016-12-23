(function () {

    var googleMap = ['Address', '_', 'AddressService', function (Address, _, AddressService) {
        return {
            scope: {
                centerPosition: '<',
                viewport: '<',
                users: '<'
            },
            restrict: 'A',
            link: function (scope, element, attrs) {
                var options = {
                    center: {
                        lat: scope.centerPosition.latitude,
                        lng: scope.centerPosition.longtitude
                    },
                    zoom: 10
                };
                console.log(scope.users);
                var map = new google.maps.Map(element[0], options);
                var bound = new google.maps.LatLngBounds(scope.viewport.southwest, scope.viewport.northeast);
                map.fitBounds(bound);
            }
        };
    }];

    angular.module('driveMonitor').directive('googleMap', googleMap);
})();