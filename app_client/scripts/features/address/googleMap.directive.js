(function () {

    var googleMap = ['Address', '_', 'AddressService', function (Address, _, AddressService) {
        return {
            scope: {
                centerPosition: '<'
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

                var map = new google.maps.Map(element[0], options);

                // if (navigator.geolocation) {
                //     navigator.geolocation.getCurrentPosition(function (position) {
                //         initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                //         map.setCenter(initialLocation);
                //     });
                // }
            }
        };
    }];

    angular.module('driveMonitor').directive('googleMap', googleMap);
})();