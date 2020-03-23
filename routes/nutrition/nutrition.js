const router = require('express').Router();

router.use(function(req, res, next) {
	next();
});

module.exports = router;
