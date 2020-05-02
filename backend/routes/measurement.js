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
		value: req.body.weight
	});
	if (user.maintenanceCalories <= 0) user.maintenanceCalories = Math.round(2.20462 * user.weight[0].value * 15);
	await user.save();
	res.sendStatus(200);
});

router.get('/weight', async (req, res) => {
	const user = await User.findOne({ _id: req.user._id });
	if (user.weight.length > 0) res.send({ weight: user.weight[0].value });
	else res.status(400).send('Weight required');
});

router.get('/weight/history', async (req, res) => {
	const user = await User.findOne({ _id: req.user._id });
	if (user.weight.length > 0) res.send({ weight: user.weight });
	else res.status(400).send('Weight required');
});

router.post('/', async (req, res) => {
	//validate weight
	const user = await User.findOne({ _id: req.user._id });
	if (req.body.weight > 0) {
		user.weight.unshift({
			value: req.body.weight
		});
		if (user.maintenanceCalories <= 0) user.maintenanceCalories = Math.round(2.20462 * user.weight[0].value * 15);
	}
	if (req.body.height > 0) {
		user.height.unshift({
			value: req.body.height
		});
	}
	if (req.body.waist > 0) {
		user.waist.unshift({
			value: req.body.waist
		});
	}
	if (req.body.hips > 0) {
		user.hips.unshift({
			value: req.body.hips
		});
	}
	if (req.body.rightBicep > 0) {
		user.rightBicep.unshift({
			value: req.body.rightBicep
		});
	}
	if (req.body.leftBicep > 0) {
		user.leftBicep.unshift({
			value: req.body.leftBicep
		});
	}
	if (req.body.rightForearm > 0) {
		user.rightForearm.unshift({
			value: req.body.rightForearm
		});
	}
	if (req.body.leftForearm > 0) {
		user.leftForearm.unshift({
			value: req.body.leftForearm
		});
	}
	if (req.body.shoulders > 0) {
		user.shoulders.unshift({
			value: req.body.shoulders
		});
	}
	if (req.body.chest > 0) {
		user.chest.unshift({
			value: req.body.chest
		});
	}
	if (req.body.neck > 0) {
		user.neck.unshift({
			value: req.body.neck
		});
	}
	await user.save();
	res.sendStatus(200);
});

router.get('/', async (req, res) => {
	const user = await User.findOne({ _id: req.user._id });
	if (user.weight.length > 0)
		res.send({
			weight: user.weight[0].value,
			height: user.height.length > 0 ? user.height[0].value : 0,
			waist: user.waist.length > 0 ? user.waist[0].value : 0,
			hips: user.hips.length > 0 ? user.hips[0].value : 0,
			rightBicep: user.rightBicep.length > 0 ? user.rightBicep[0].value : 0,
			leftBicep: user.leftBicep.length > 0 ? user.leftBicep[0].value : 0,
			rightForearm: user.leftForearm.length > 0 ? user.leftForearm[0].value : 0,
			leftForearm: user.rightForearm.length > 0 ? user.rightForearm[0].value : 0,
			shoulders: user.shoulders.length > 0 ? user.shoulders[0].value : 0,
			chest: user.chest.length > 0 ? user.chest[0].value : 0,
			neck: user.neck.length > 0 ? user.neck[0].value : 0
		});
	else res.status(400).send('Weight required');
});

module.exports = router;
