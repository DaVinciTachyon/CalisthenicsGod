const router = require('express').Router();
const verify = require('./verifyToken');
const authRoute = require('./auth');
const nutrientRoute = require('./nutrients');
const userRoute = require('./user');

router.use(function(req, res, next) {
	next();
});

router.use('/auth', authRoute);
router.use('/nutrients', nutrientRoute);
router.use('/user', userRoute);

module.exports = router;
