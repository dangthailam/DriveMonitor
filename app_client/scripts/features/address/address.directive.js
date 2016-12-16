(function () {

    var googlePlace = ['Address', '_', function (Address, _) {
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
                var STREET_NUMBER_TYPE = 'street_number';
                var STREET_TYPE = 'route';
                var POSTAL_CODE_TYPE = 'postal_code';

                scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

                google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
                    var place = scope.gPlace.getPlace();
                    var addressComponents = place.address_components;
                    var location = new Address(
                        $(element).val(),
                        filterAddressComponent(addressComponents, STREET_NUMBER_TYPE),
                        filterAddressComponent(addressComponents, STREET_TYPE),
                        filterAddressComponent(addressComponents, CITY_TYPE),
                        filterAddressComponent(addressComponents, DEPARTMENT_TYPE),
                        filterAddressComponent(addressComponents, REGION_TYPE),
                        filterAddressComponent(addressComponents, COUNTRY_TYPE),
                        filterAddressComponent(addressComponents, POSTAL_CODE_TYPE),
                        place.geometry.location.lat(),
                        place.geometry.location.lng()
                    );

                    scope.$apply(function () {
                        scope.location = location;
                        model.$setViewValue($(element).val());
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