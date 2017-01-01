(function () {
    var mongoose = require('mongoose');
    var crypto = require('crypto');
    var _ = require('lodash');

    var authenticationSchema = new mongoose.Schema({
        email: {
            type: String,
            unique: true,
            required: true
        },
        name: String,
        phone: String,
        createdAt: Date,
        updatedAt: Date,
        image: {
            data: Buffer,
            contentType: String,
            fileName: String
        },
        birth: {
            day: Number,
            month: Number,
            year: Number
        },
        hash: String,
        salt: String
    });

    authenticationSchema.methods.setPassword = function (password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    };

    authenticationSchema.methods.validPassword = function (password) {
        var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
        return this.hash === hash;
    };

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