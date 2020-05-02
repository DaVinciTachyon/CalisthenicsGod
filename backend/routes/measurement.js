const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../models/User');

router.use(verify, (req, res, next) => {
	next();
});

router.post('/weight', async (req, res) => {
	//validate weight
	const user = await User.findOne({ _id: req.user._id });
	user.weight.unshift({
		weight: req.body.weight
	});
	if (user.maintenanceCalories <= 0) user.maintenanceCalories = 2.20462 * user.weight[0].weight * 15;
	await user.save();
	res.sendStatus(200);
});

router.get('/weight', async (req, res) => {
	const user = await User.findOne({ _id: req.user._id });
	if (user.weight.length > 0) res.status(400).send({ weight: user.weight[0].weight });
	else res.status(400).send('Weight required');
});

module.exports = router;
