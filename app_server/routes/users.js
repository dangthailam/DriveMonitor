var UserController  = require('../controllers/user.controller')

module.exports = function(router) {
    router.route('')
        .post(UserController.create)
        .get(UserController.all);

    router.route('/:userId')
        .get(UserController.findById)
        .patch(UserController.update);
};
