(function () {
    require('./address.model');

    var mongoose = require('mongoose');
    var crypto = require('crypto');
    var jwt = require('jsonwebtoken');
    var _ = require('lodash');

    var userSchema = new mongoose.Schema({
        email: {
            type: String,
            unique: true,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        phone: String,
        birth: {
            day: Number,
            month: Number,
            year: Number
        },
        created_at: Date,
        updated_at: Date,
        image: {
            data: Buffer,
            contentType: String,
            fileName: String
        },
        isMonitor: Boolean,
        announcement: {
            title: String,
            description: String,
            rate: String,
            location: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Address'
            }
        },
        schedule: [{
            day: Number,
            ranges: [{
                startIndex: Number,
                endIndex: Number
            }]
        }],
        hash: String,
        salt: String
    });

    userSchema.methods.setPassword = function (password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    };

    userSchema.methods.validPassword = function (password) {
        var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
        return this.hash === hash;
    };

    userSchema.methods.generateJwt = function () {
        var expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);

        return jwt.sign({
            _id: this._id,
            email: this.email,
            name: this.name,
            exp: parseInt(expiry.getTime() / 1000),
        }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
    };

    userSchema.methods.export = function () {
        return _.omit(this.toObject(), ['__v', 'created_at', 'updated_at', 'hash', 'salt']);
    };

    userSchema.pre('save', function (next) {
        // get the current date
        var currentDate = new Date();

        // change the updated_at field to current date
        this.updated_at = currentDate;

        // if created_at doesn't exist, add to that field
        if (!this.created_at)
            this.created_at = currentDate;

        next();
    });

    mongoose.model('User', userSchema);
})();