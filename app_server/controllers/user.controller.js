const mongoose = require('mongoose');
const User = mongoose.model('User');
const _ = require('lodash');
const fs = require('fs');

var create = function (req, res) {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.save(function (err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token": token
        });
    });
};

var findById = function (req, res) {
    User.findById(req.params.userId, function (err, user) {
        if (err) {
            res.status(400).json(err);
            return;
        }
        res.status(200).json(user.export());
    });
};

var update = function (req, res) {
    User.findById(req.params.userId, function (err, user) {
        if (err) {
            res.status(400).json(err);
            return;
        }

        for (var prop in req.body) {
            user[prop] = req.body[prop];
        }

        user.save(function (err) {
            if (err) {
                res.status(400).json(err);
                return;
            }
            res.status(200).json(user.export());
        });
    });
};

var getMany = function (req, res) {
    if (req.query.country && req.query.pageNumber && req.query.quantityPerPage) {
        var streetNumber = req.query.country;
        var street = req.query.country;
        var city = req.query.country;
        var region = req.query.country;
        var department = req.query.country;
        var country = req.query.country;
        var pageNumber = req.query.country;
        var quantityPerPage = req.query.country;

        res.status(200).json(req.query);
    } else {
        var quantity = req.query.quantity ? parseInt(req.query.quantity) : null;
        var isMonitor = req.query.isMonitor;
        getUsers(req, res, quantity, isMonitor);
    }
};

function getUsers(req, res, quantity, isMonitor) {
    if (isMonitor === null || isMonitor === undefined) {
        users = User.find({});
    } else {
        users = User.find({
            'isMonitor': isMonitor
        });
    }
    if (quantity) {
        users = users.limit(quantity);
    }

    users.exec(function (err, users) {
        if (err) {
            res.status(400).json(err);
            return;
        }
        res.status(200).json(_.map(users, function (u) {
            return u.export();
        }));
    });
}

var updateProfilePicture = function (req, res) {
    User.findById(req.params.userId, function (err, user) {
        if (err) {
            res.status(400).json(err);
            return;
        }

        var filePath = req.files.file.path;

        user.image.data = fs.readFileSync(filePath);
        user.image.contentType = req.files.file.type;
        user.image.fileName = req.files.file.name;

        user.save(function (err) {
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
    update: update,
    getMany: getMany,
    updateProfilePicture: updateProfilePicture
};