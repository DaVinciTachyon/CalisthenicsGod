const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../models/User');
const Food = require('../models/Food');

router.use(verify, (req, res, next) => {
	next();
});

const macronutrientDensities = {
	//FIXME in db?
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

	let weight = 0;
	if (user.weight.length > 0) weight = user.weight[0].weight;
	else return res.status(400).send('Weight required');

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
	)
		for (let i = 0; i < user.food[0].meals.length; i++) {
			fat += user.food[0].meals[i].fat;
			carbohydrates += user.food[0].meals[i].carbohydrate;
			protein += user.food[0].meals[i].protein;
			ethanol += user.food[0].meals[i].ethanol;
		}

	let totalCalories = 1843; //FIXME put into db
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
		mode: user.calorieMode,
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

router.post('/food', async (req, res) => {
	const food = req.body.food;
	const user = await User.findOne({ _id: req.user._id });
	let today = new Date();
	for (let i = 0; i < food.length; i++) {
		let meal = {
			name: food[i].name,
			fat: food[i].fat,
			carbohydrate: food[i].carbohydrate,
			protein: food[i].protein,
			ethanol: food[i].ethanol
		};
		if (
			user.food.length > 0 &&
			user.food[0].date.getDay() === today.getDay() &&
			user.food[0].date.getMonth() === today.getMonth() &&
			user.food[0].date.getFullYear() === today.getFullYear()
		)
			user.food[0].meals.push(meal);
		else
			user.food.unshift({
				meals: [
					meal
				]
			});
	}
	await user.save();
	res.sendStatus(200);
});

module.exports = router;
