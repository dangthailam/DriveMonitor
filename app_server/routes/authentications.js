var AuthenticationController = require('../controllers/authentication.controller');

module.exports = function (router) {
    router.route('/:authId')
        .patch(AuthenticationController.update);
};