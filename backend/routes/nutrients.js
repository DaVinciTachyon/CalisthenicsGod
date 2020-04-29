const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../models/User');
const Food = require('../models/Food');

router.use(verify, (req, res, next) => {
	next();
});

const macronutrientDensities = {
	//in db?
	fat: 9,
	carbohydrate: 4,
	protein: 4,
	ethanol: 7
};

router.get('/today/meals', async (req, res) => {
	const user = await User.findOne({ _id: req.user._id });
	let today = new Date();
	if (
		user.food.length > 0 &&
		user.food[0].date.getDay() === today.getDay() &&
		user.food[0].date.getMonth() === today.getMonth() &&
		user.food[0].date.getFullYear() === today.getFullYear()
	)
		res.send({
			meals: user.food[0].meals
		});
	else
		res.send({
			meals: []
		});
});

router.get('/today/userInfo', async (req, res) => {
	const user = await User.findOne({ _id: req.user._id });
	let fat = 0;
	let carbohydrates = 0;
	let protein = 0;
	let ethanol = 0;
	let today = new Date();
	if (
		user.food.length > 0 &&
		user.food[0].date.getDay() === today.getDay() &&
		user.food[0].date.getMonth() === today.getMonth() &&
		user.food[0].date.getFullYear() === today.getFullYear()
	) {
		for (let i = 0; i < user.food[0].meals.length; i++) {
			fat += user.food[0].meals[i].fat;
			carbohydrates += user.food[0].meals[i].carbohydrate;
			protein += user.food[0].meals[i].protein;
			ethanol += user.food[0].meals[i].ethanol;
		}
	}

	let mode = 'deficit';
	let weight = 76;
	let totalCalories = 1843;
	let proteinPerKg = 1.9;
	let fatPartition = 0.3;
	let goalProtG = Math.round(weight * proteinPerKg * 10) / 10;
	let goalFatG = Math.round(totalCalories * fatPartition / macronutrientDensities.fat * 10) / 10;
	let goalCarbG =
		Math.round(
			(totalCalories - goalFatG * macronutrientDensities.fat - goalProtG * macronutrientDensities.protein) * 10
		) / 10;
	let goalEthG = 0;
	res.send({
		mode: mode,
		totalCalories: totalCalories,
		goalProtein: goalProtG,
		goalFat: goalFatG,
		goalCarbohydrate: goalCarbG,
		goalEthanol: goalEthG,
		currentFat: fat,
		currentProtein: protein,
		currentCarbohydrate: carbohydrates,
		currentEthanol: ethanol
	});
});

router.get('/macronutrientDensities', (req, res) => {
	res.send(macronutrientDensities);
});

router.post('/food', (req, res) => {
	const food = req.body.food;
	food.forEach(async (element) => {
		const user = await User.findOne({ _id: req.user._id });
		let today = new Date();
		if (
			user.food.length > 0 &&
			user.food[0].date.getDay() === today.getDay() &&
			user.food[0].date.getMonth() === today.getMonth() &&
			user.food[0].date.getFullYear() === today.getFullYear()
		)
			user.food[0].meals.push({
				name: element.name,
				fat: element.fat,
				carbohydrate: element.carbohydrate,
				protein: element.protein,
				ethanol: element.ethanol
			});
		else
			user.food.unshift({
				meals: [
					{
						name: element.name,
						fat: element.fat,
						carbohydrate: element.carbohydrate,
						protein: element.protein,
						ethanol: element.ethanol
					}
				]
			});
		await user.save();
	});
	res.sendStatus(200);
});

module.exports = router;
