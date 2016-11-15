var passport = require('passport');

module.exports = function(router) {
    router.post('', function(req, res) {
        req.assert('email', 'Email is not valid!').isEmail();
        req.assert('password', 'Password is empty!').notEmpty();

        var err = req.validationErrors();

        if (err) {
            req.flash('errors', err);
            return res.redirect('/token/loginFailure');
        }

        passport.authenticate('local', function(err, user, info) {
            if (err) {
                res.status(404).json(err);
                return;
            }

            // If a user is found
            if (user) {
                token = user.generateJwt();
                res.status(200);
                res.json({
                    "token": token
                });
            } else {
                // If user is not found
                res.status(401).json(info);
            }
        })(req, res);
    });

    router.get('/loginFailure', function(req, res) {
        res.status(400).json(req.flash('errors'));
    })
};
