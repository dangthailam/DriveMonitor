(function () {
    angular.module('driveMonitor').factory('Address', [function () {
        class Address {
            constructor(address, streetNumber, street, city, department, region, country, postalCode, geoLattitude, geoLongtitude) {
                this.address = address;
                this.streetNumber = streetNumber;
                this.street = street;
                this.city = city;
                this.department = department;
                this.region = region;
                this.country = country;
                this.postalCode = postalCode;
                this.geoLattitude = geoLattitude;
                this.geoLongtitude = geoLongtitude;
            }
        }

        return Address;
    }]);
})();