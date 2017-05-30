const mongoose = require('mongoose');
const _ = require('lodash');
const fs = require('fs');

const User = mongoose.model('User');
const Authentication = mongoose.model('Authentication');
const Address = mongoose.model('Address');

function handleError(res, err) {
    res.status(400).json(err);
    return;
}

var create = function (req, res) {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.save(function (err) {
        if (err) return handleError(res, err);
        var token;
        token = user.generateJwt();
        res.status(200).json({
            "token": token
        });
    });
};



var findById = function (req, res) {
    var userQuery = User.findById(req.params.userId).populate('announcement.location');
    // if (req.query.populateProperties) {
    //     userQuery.lean().populate(req.query.populateProperties);
    // }
    userQuery.exec(function (err, user) {
        if (err) return handleError(res, err);
        // if (req.query.populateProperties.indexOf('authentication') != -1) {
        //     delete user.authentication.hash;
        //     delete user.authentication.salt;
        // }
        res.status(200).json(user);
    });
};

var update = function (req, res) {
    User.findById(req.params.userId, function (err, user) {
        if (err) return handleError(res, err);

        if (_.has(req.body, 'announcement')) {
            if (!user.announcement || !user.announcement.location) {
                var address = new Address(req.body.announcement.location);
                address.save(function (err) {
                    if (err) return handleError(res, err);
                    user.announcement.location = address._id;
                    for (var prop in req.body.announcement) {
                        if (prop !== 'location')
                            user.announcement[prop] = req.body.announcement[prop];
                    }
                    saveUser(req, res, user);
                });
            } else {
                Address.findById(user.announcement.location, function (err, addr) {
                    if (err) return handleError(res, err);
                    for (var prop in req.body.announcement.location) {
                        addr[prop] = req.body.announcement.location[prop];
                    }
                    addr.save(function (err) {
                        for (var prop in req.body.announcement) {
                            if (prop !== 'location')
                                user.announcement[prop] = req.body.announcement[prop];
                        }
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
        if (err) return handleError(res, err);
        res.status(200).json(user);
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
        getUsers(req, res);
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
    }).lean().populate('announcement.location authentication').exec(function (err, users) {
        _.forEach(users, function (u) {
            delete u.authentication.hash;
            delete u.authentication.salt;
        });

        res.status(200).json({
            users: users,
            total: count,
            found: count > 0 ? true : false
        });
    });
}

function getUsers(req, res) {
    var users = User.find({}).populate('announcement.location');

    users.exec(function (err, users) {
        if (err) return handleError(err);
        res.status(200).json(users);
    });
}

var updateProfilePicture = function (req, res) {
    User.findById(req.params.userId).populate('authentication').exec(function (err, user) {
        if (err) return handleError(err);

        var filePath = req.files.file.path;

        user.image.data = fs.readFileSync(filePath);
        user.image.contentType = req.files.file.type;
        user.image.fileName = req.files.file.name;

        user.save(function (err) {
            if (err) return handleError(res, err);
            res.status(200).json(user);
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