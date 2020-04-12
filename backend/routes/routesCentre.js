const router = require('express').Router();
const authRoute = require('./auth');
const verify = require('./verifyToken');

router.use(function(req, res, next) {
	next();
});

router.use('/auth', authRoute);

module.exports = router;
