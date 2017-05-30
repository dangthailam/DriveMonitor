(function () {
    var mongoose = require('mongoose');

    var authenticationSchema = new mongoose.Schema({
        
    });

    

    authenticationSchema.pre('save', function (next) {
        // get the current date
        var currentDate = new Date();

        // change the updated_at field to current date
        this.updatedAt = currentDate;

        // if created_at doesn't exist, add to that field
        if (!this.createdAt)
            this.createdAt = currentDate;

        next();
    });

    mongoose.model('Authentication', authenticationSchema);
})();