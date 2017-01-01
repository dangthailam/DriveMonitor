const mongoose = require('mongoose');
const Authentication = mongoose.model('Authentication');

function handleError(res, err) {
    res.status(400).json(err);
    return;
}

var update = function (req, res) {
    Authentication.findById(req.params.authId, function (err, authentication) {
        if (err) return handleError(res, err);
        for (var prop in req.body) {
            authentication[prop] = req.body[prop];
        }

        authentication.save(function (err) {
            if (err) return handleError(res, err);
            res.status(200).json(authentication);
        });
    });
};

module.exports = {
    update: update
};