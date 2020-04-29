const router = require('express').Router();
const verify = require('./verifyToken');
const authRoute = require('./auth');
const nutrientRoute = require('./nutrients');

router.use(function(req, res, next) {
	next();
});

router.use('/auth', authRoute);
router.use('/nutrients', nutrientRoute);

module.exports = router;
