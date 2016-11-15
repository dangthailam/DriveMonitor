var mongoose = require('mongoose');
var User = mongoose.model('User');

var create = function(req, res) {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.save(function(err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token": token
        });
    });
};

var findById = function(req, res) {
    User.findById(req.params.userId, function(err, user) {
        if (err) {
            res.status(400).json(err);
            return;
        }
        res.status(200).json(user.export());
    });
};

var update = function(req, res) {
    User.findById(req.params.userId, function(err, user) {
        if (err) {
            res.status(400).json(err);
            return;
        }

        for (var prop in req.body) {
            user[prop] = req.body[prop];    
        }

        user.save(function(err) {
            if (err) {
                res.status(400).json(err);
                return;
            }
            res.status(200).json(user.export());
        });

    });
};

module.exports = {
    create: create,
    findById: findById,
    update: update
};