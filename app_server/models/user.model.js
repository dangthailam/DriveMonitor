(function () {
    require('./address.model');
    require('./authentication.model');
    require('./reservation.model');

    const mongoose = require('mongoose');
    const jwt = require('jsonwebtoken');

    var userSchema = new mongoose.Schema({
        authentication: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Authentication'
        },
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
            ranges: [{
                startIndex: Number,
                endIndex: Number
            }]
        }],
        createdAt: Date,
        updatedAt: Date,
        reservationAsStudent: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reservation'
        }],
        reservationAsMonitor: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reservation'
        }]
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