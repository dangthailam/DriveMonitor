(function () {
    var mongoose = require('mongoose');

    var scheduleSchema = new mongoose.Schema({
        startDay: Date,
        days: [{
            number: Number,
            hourRange: {
                startHour: Date,
                endHour: Date
            }
        }]
    });

    mongoose.model('Schedule', scheduleSchema);
})();