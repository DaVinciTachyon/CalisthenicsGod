const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../models/User');

router.use(verify, (req, res, next) => {
	next();
});

router.post('/calorieMode', async (req, res) => {
	//validate calorieMode
	const user = await User.findOne({ _id: req.user._id });
	user.calorieMode = req.body.calorieMode;
	await user.save();
	res.sendStatus(200);
});

module.exports = router;
