const router = require('express').Router();

const usersRoutes = require('./users/routes');
const projectsRoutes = require('./projects/routes');


router.all("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

router.use('/users', usersRoutes);
router.use('/projects', projectsRoutes);

module.exports = router;
