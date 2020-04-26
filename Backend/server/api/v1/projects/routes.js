const router = require('express').Router();

const { auth, } = require('./../auth');

const controller = require('./controller');

router.route('/')
    .get(auth, controller.list)
    .post(auth, controller.create);

router.route('/:id')
    .get(auth, controller.read)
    .put(auth, controller.update)
    .delete(auth, controller.delete);


module.exports = router;
