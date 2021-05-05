const router = require('express').Router();
const stageRoute = require('./stage');
const verify = require('./verifyToken');

router.use(verify, (req, res, next) => {
	next();
});
router.use('/stage', stageRoute);

module.exports = router;