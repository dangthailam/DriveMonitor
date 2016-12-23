(function () {
    require('./address.model');
    require('./authentication.model');

    const mongoose = require('mongoose');
    const jwt = require('jsonwebtoken');

    var userSchema = new mongoose.Schema({
        authentication: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Authentication'
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        name: {
            type: String,
            required: true
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
        }]
    });

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

    mongoose.model('User', userSchema);
})();