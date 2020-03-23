const router = require('express').Router();
const nutritionRoute = require('./nutrition/nutrition');
const exerciseRoute = require('./exercise/exercise');

router.use(function(req, res, next) {
	next();
});

router.use('/nutrition', nutritionRoute);
router.use('/exercise', exerciseRoute);

module.exports = router;
