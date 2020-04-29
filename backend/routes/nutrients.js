const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../models/User');

router.use(verify, (req, res, next) => {
	next();
});

let vars = {
	//stored in db
	fat: 1.0,
	carbohydrate: 1.0,
	protein: 1.0,
	ethanol: 1.0
};

const macronutrientDensities = {
	//in db?
	fat: 9,
	carbohydrate: 4,
	protein: 4,
	ethanol: 7
};

router.get('/today/userInfo', (req, res) => {
	//mostly in db
	let mode = 'deficit';
	let weight = 76;
	let fat = vars.fat;
	let protein = vars.protein;
	let carbohydrates = vars.carbohydrate;
	let ethanol = vars.ethanol;
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
	food.forEach((element) => {
		vars.fat = Math.round((vars.fat + parseFloat(element.fat)) * 10) / 10;
		vars.carbohydrate = Math.round((vars.carbohydrate + parseFloat(element.carbohydrate)) * 10) / 10;
		vars.protein = Math.round((vars.protein + parseFloat(element.protein)) * 10) / 10;
		vars.ethanol = Math.round((vars.ethanol + parseFloat(element.ethanol)) * 10) / 10;
	});
	res.sendStatus(200);
});

module.exports = router;
