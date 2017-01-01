(function(){
    require('./user.model');
    
    const mongoose = require('mongoose');

    var reservationSchema = new mongoose.Schema({
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        monitor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        startedAt: Date,
        duration: Number,
        state: {
            type: String,
            enum: ['Canceled', 'Accepted', 'Not accepted', 'Completed'],
            default: 'Not accepted'
        },
        review: String,
        rate: {
            type: Number,
            min: 0,
            max: 5
        },
        message: String,
        createdAt: Date,
        updatedAt: Date
    });

    reservationSchema.pre('save', function (next) {
        // get the current date
        var currentDate = new Date();

        // change the updated_at field to current date
        this.updatedAt = currentDate;

        // if created_at doesn't exist, add to that field
        if (!this.createdAt)
            this.createdAt = currentDate;

        next();
    });
    
    mongoose.model('Reservation', reservationSchema);
})();