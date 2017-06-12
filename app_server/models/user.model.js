(function () {
    require('./address.model');
    require('./reservation.model');

    const mongoose = require('mongoose');
    const jwt = require('jsonwebtoken');
    var crypto = require('crypto');
    var _ = require('lodash');

    var userSchema = new mongoose.Schema({
        email: {
            type: String,
            unique: true,
            required: true
        },
        name: String,
        phone: String,
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
        salt: String,
        roles: {
            type: [{
                type: String,
                enum: ['User', 'Monitor', 'Admin']
            }],
            default: ['User']
        },
        announcement: {
            title: String,
            description: String,
            rate: String,
            phone: String,
            location: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Address'
            }
        },
        schedule: [{
            day: Number,
            open: Boolean,
            ranges: [{
                startHour: String,
                endHour: String
            }]
        }],
        reservationAsStudent: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reservation'
        }],
        reservationAsMonitor: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reservation'
        }],
        remoteSource: [{
            sourceId: String,
            source: {
                type: String,
                enum: ['Facebook', 'GPlus']
            }
        }],
        createdAt: Date,
        updatedAt: Date
    });

    userSchema.pre('save', function (next) {
        // get the current date
        var currentDate = new Date();

        // change the updated_at field to current date
        this.updatedAt = currentDate;

        // if created_at doesn't exist, add to that field
        if (!this.createdAt)
            this.createdAt = currentDate;

        next();
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
            exp: parseInt(expiry.getTime() / 1000),
        }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
    };

    mongoose.model('User', userSchema);
})();