(function () {

    var googlePlace = ['Address', '_', 'AddressService', function (Address, _, AddressService) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, model) {
                var options = {
                    types: [],
                    componentRestrictions: {
                        country: 'fr'
                    }
                };
                
                var gPlace = new google.maps.places.Autocomplete(element[0], options);

                google.maps.event.addListener(gPlace, 'place_changed', function () {
                    scope.$apply(function () {
                        model.$setViewValue($(element).val());
                    });
                });
            }
        };
    }];

    angular.module('driveMonitor').directive('googlePlace', googlePlace);
})();