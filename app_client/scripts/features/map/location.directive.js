(function () {

    var googlePlace = ['_', function (_) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, model) {
                var options = {
                    types: [],
                    componentRestrictions: {}
                };

                var REGION_TYPE = 'administrative_area_level_1';
                var DEPARTMENT_TYPE = 'administrative_area_level_2';
                var CITY_TYPE = 'locality';
                var COUNTRY_TYPE = 'country';
                var STREET_NUMBER_TYPE = 'country';

                scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

                google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
                    var addressComponents = scope.gPlace.getPlace().address_components;

                    var address = {
                        city: filterAddressComponent(addressComponents, CITY_TYPE),
                        department: filterAddressComponent(addressComponents, DEPARTMENT_TYPE),
                        region: filterAddressComponent(addressComponents, REGION_TYPE),
                        country: filterAddressComponent(addressComponents, COUNTRY_TYPE)
                    };

                    scope.$apply(function () {
                        model.$setViewValue(address);
                    });
                });

                function filterAddressComponent(addressComponents, addressType) {
                    var addressComponent = _.find(addressComponents, function (ac) {
                        return ac.types.indexOf(addressType) !== -1;
                    });

                    if (addressComponent) {
                        return addressComponent.long_name;
                    }
                }
            }
        };
    }];

    angular.module('driveMonitor').directive('googlePlace', googlePlace);
})();