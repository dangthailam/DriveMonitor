(function () {
    var mongoose = require('mongoose');

    var addressSchema = new mongoose.Schema({
        address: String,
        streetNumber: String,
        street: String,
        city: String,
        department: String,
        region: String,
        country: String,
        postalCode: String,
        geoLattitude: Number,
        geoLongtitute: Number
    });

    mongoose.model('Address', addressSchema);
})();