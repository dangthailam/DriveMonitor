var UserController = require('../controllers/user.controller');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();


module.exports = function (router) {
    router.route('/')
        .post(UserController.create)
        .get(UserController.getMany);

    router.route('/:userId')
        .get(UserController.findById)
        .patch(UserController.update);

    router.post('/:userId', multipartyMiddleware, UserController.updateProfilePicture);
};