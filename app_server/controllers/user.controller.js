const mongoose = require('mongoose');
const User = mongoose.model('User');
const Address = mongoose.model('Address');
const _ = require('lodash');
const fs = require('fs');
const Promise = require('bluebird');

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
    User.findById(req.params.userId).populate('announcement.location').exec(function (err, user) {
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

        if (_.has(req.body, 'announcement')) {
            if (!user.announcement || !user.announcement.location) {
                var address = new Address(req.body.announcement.location);
                address.save(function (err) {
                    user.announcement.location = address._id;
                    saveUser(req, res, user);
                });
            } else {
                Address.findById(user.announcement.location, function (err, addr) {
                    for (var prop in req.body.announcement.location) {
                        addr[prop] = req.body.announcement.location[prop];
                    }
                    addr.save(function (err) {
                        saveUser(req, res, user);
                    });
                });
            }
        } else {
            saveUser(req, res, user);
        }
    });
};

function saveUser(req, res, user) {
    for (var prop in req.body) {
        if (prop !== 'announcement')
            user[prop] = req.body[prop];
    }

    user.save(function (err) {
        if (err) {
            res.status(400).json(err);
            return;
        }
        res.status(200).json(user.export());
    });
}

var getMany = function (req, res) {
    if (req.query.country && req.query.pageNumber && req.query.quantityPerPage) {
        var streetNumber = req.query.streetNumber;
        var street = req.query.street;
        var city = req.query.city;
        var region = req.query.region;
        var department = req.query.department;
        var country = req.query.country;
        var pageNumber = req.query.pageNumber;
        var quantityPerPage = req.query.quantityPerPage;
        var geoLatitude = req.query.geoLatitude;
        var geoLongtitude = req.query.geoLongtitude;
        searchUsers(res, pageNumber, quantityPerPage, geoLatitude, geoLongtitude, country, region, department, city, street);
    } else {
        var quantity = req.query.quantity ? parseInt(req.query.quantity) : null;
        var isMonitor = req.query.isMonitor;
        getUsers(res, quantity, isMonitor);
    }
};

function searchUsers(res, pageNumber, quantityPerPage, geoLatitude, geoLongtitude, country, region, department, city, street) {
    var queryClue;
    var total;

    var params = {};
    if (country) {
        params.country = country;
        queryClue = "country";
    }
    if (region) {
        params.region = region;
        queryClue = "region";
    }
    if (department) {
        params.department = department;
        queryClue = "department";
    }
    if (city) {
        params.city = city;
        queryClue = "city";
    }
    if (street) {
        params.street = street;
        queryClue = "street";
    }

    Address.find(params).count(function (err, count) {
        if (count) {
            Address.find(params).skip((pageNumber - 1) * quantityPerPage).limit(parseInt(quantityPerPage)).exec(function (err, addresses) {
                findUserByAddress(res, addresses, count);
            });
        } else {
            suggestUsers(res, params, queryClue);
        }
    });
}

function suggestUsers(res, query, queryClue) {
    var params = {};
    var clues = ["country", "region", "department", "city"]; //no street

    var idx = _.findIndex(clues, function (c) {
        return c === queryClue;
    });

    for (var i = 0; i < idx; i++) {
        params[clues[i]] = query[clues[i]];
    }

    Address.find(params).limit(5).exec(function (err, addresses) {
        if (addresses && addresses.length) {
            findUserByAddress(res, addresses, 0);
        } else {
            idx = idx - 1;
            if (idx >= 0) {
                queryClue = clues[idx];
                suggestUsers(res, query, queryClue);
            }
        }
    });
}

function findUserByAddress(res, addresses, count) {
    User.find({
        'announcement.location': {
            $in: _.map(addresses, function (addr) {
                return addr._id;
            })
        }
    }, function (err, users) {
        var returnUsers = _.map(users, function (u) {
            return u.export();
        });
        res.status(200).json({
            users: returnUsers,
            total: count,
            found: count > 0 ? true : false
        });
    });
}

function getUsers(res, quantity, isMonitor) {
    if (isMonitor === null || isMonitor === undefined) {
        users = User.find({}).populate('announcement.location');
    } else {
        users = User.find({
            'isMonitor': isMonitor
        }).populate('announcement.location');
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