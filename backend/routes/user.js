const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../models/User');

router.use(verify, (req, res, next) => {
	next();
});

router.post('/calorieOffset', async (req, res) => {
	//validate calorieMode
	const user = await User.findOne({ _id: req.user._id });
	user.calorieOffset = req.body.calorieOffset;
	await user.save();
	res.sendStatus(200);
});

router.get('/calorieOffset', async (req, res) => {
	const user = await User.findOne({ _id: req.user._id });
	res.send({ calorieOffset: user.calorieOffset });
});

router.get('/', async (req, res) => {
	const user = await User.findOne({ _id: req.user._id });
	res.send({
		name: user.name,
		email: user.email,
		dateJoined: user.dateJoined,
		birthDate: user.birthDate,
		gender: user.gender,
		maintenanceCalories: user.maintenanceCalories,
		calorieOffset: user.calorieOffset,
		proteinAmount: user.proteinAmount,
		fatPartition: user.fatPartition
	});
});

module.exports = router;
