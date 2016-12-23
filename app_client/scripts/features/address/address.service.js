(function () {
    var addressService = ['$http', 'Address', function ($http, Address) {
        var REGION_TYPE = 'administrative_area_level_1';
        var DEPARTMENT_TYPE = 'administrative_area_level_2';
        var CITY_TYPE = 'locality';
        var COUNTRY_TYPE = 'country';
        var STREET_NUMBER_TYPE = 'street_number';
        var STREET_TYPE = 'route';
        var POSTAL_CODE_TYPE = 'postal_code';
        var geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
        var apiKey = 'AIzaSyBpFU-iuhll0xMKkRs02WAlM8CdWWfsbo0';

        function filterAddressComponent(addressComponents, addressType) {
            var addressComponent = _.find(addressComponents, function (ac) {
                return ac.types.indexOf(addressType) !== -1;
            });

            if (addressComponent) {
                return addressComponent.long_name;
            }
        }

        var getGooglePlace = function (address) {
            return $http({
                url: geocodeUrl,
                method: "GET",
                params: {
                    key: apiKey,
                    address: address
                }
            }).then(function (result) {
                if (result.data.status === "OK") {
                    var place = result.data.results[0];
                    var addressComponents = place.address_components;
                    var returnAddress = new Address(
                        address,
                        filterAddressComponent(addressComponents, STREET_NUMBER_TYPE),
                        filterAddressComponent(addressComponents, STREET_TYPE),
                        filterAddressComponent(addressComponents, CITY_TYPE),
                        filterAddressComponent(addressComponents, DEPARTMENT_TYPE),
                        filterAddressComponent(addressComponents, REGION_TYPE),
                        filterAddressComponent(addressComponents, COUNTRY_TYPE),
                        filterAddressComponent(addressComponents, POSTAL_CODE_TYPE),
                        place.geometry.location.lat,
                        place.geometry.location.lng
                    );

                    return {
                        address: returnAddress,
                        viewport: place.geometry.viewport
                    };
                }
                return {
                    address: new Address(address),
                    viewport: null
                };
            });
        };

        return {
            getGooglePlace: getGooglePlace
        };
    }];

    angular.module('driveMonitor').service('AddressService', addressService);
})();