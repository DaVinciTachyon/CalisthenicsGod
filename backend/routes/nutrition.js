const router = require('express').Router();
const verify = require('./verifyToken');
const Nutrients = require('../models/Nutrients');
const Measurements = require('../models/Measurements');
const Ingredients = require('../models/Ingredients');
const nutrientValidation = require('../validation/nutrition');

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

router.post('/calorieOffset', async (req, res) => {
	const { error } = nutrientValidation.calorieOffset(req.body);
	if (error) return res.status(400).send({ error: error.details[0].message });

	const nutrients = await Nutrients.findOne({ userId: req.user._id });
	nutrients.calorieOffset = req.body.calorieOffset;
	try {
		await nutrients.save();
		res.sendStatus(200);
	} catch (err) {
		res.status(400).send({ error: err });
	}
});

router.get('/calorieOffset', async (req, res) => {
	const nutrients = await Nutrients.findOne({ userId: req.user._id });
	res.send({ calorieOffset: nutrients.calorieOffset });
});

router.get('/today/meals', async (req, res) => {
	const nutrients = await Nutrients.findOne({ userId: req.user._id });
	const today = new Date();
	if (
		nutrients.history.length > 0 &&
		nutrients.history[0].date.getDay() === today.getDay() &&
		nutrients.history[0].date.getMonth() === today.getMonth() &&
		nutrients.history[0].date.getFullYear() === today.getFullYear()
	)
		res.send({
			meals: nutrients.history[0].meals
		});
	else
		res.send({
			meals: []
		});
});

router.get('/today/userInfo', async (req, res) => { //separate
	const measurements = await Measurements.findOne({ userId: req.user._id });
	const nutrients = await Nutrients.findOne({ userId: req.user._id });

	const weight = measurements.weight.length > 0 ? measurements.weight[0].value : 0;
	if(weight == 0) return res.status(404);

	let fat = 0;
	let carbohydrates = 0;
	let protein = 0;
	let ethanol = 0;
	const today = new Date();
	if (
		nutrients.history.length > 0 &&
		nutrients.history[0].date.getDay() === today.getDay() &&
		nutrients.history[0].date.getMonth() === today.getMonth() &&
		nutrients.history[0].date.getFullYear() === today.getFullYear()
	)
		for (let i = 0; i < nutrients.history[0].meals.length; i++) {
			fat 			+= nutrients.history[0].meals[i].fat;
			carbohydrates 	+= nutrients.history[0].meals[i].carbohydrate;
			protein 		+= nutrients.history[0].meals[i].protein;
			ethanol 		+= nutrients.history[0].meals[i].ethanol;
		}

	const totalCalories = Math.round(nutrients.maintenanceCalories + nutrients.calorieOffset);

	const goalProtG = Math.round(weight * nutrients.proteinAmount * 10) / 10;
	const goalFatG = Math.round(totalCalories * nutrients.fatPartition / macronutrientDensities.fat * 10) / 10;
	const goalCarbG =
		Math.round(
			(totalCalories - goalFatG * macronutrientDensities.fat - goalProtG * macronutrientDensities.protein)/macronutrientDensities.carbohydrate * 10
		) / 10;
	const goalEthG = 0;
	res.send({
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

router.post('/history', async (req, res) => {
	const { error } = nutrientValidation.mealHistory(req.body);
	if (error) return res.status(400).send({ error: error.details[0].message });

	const history = req.body.history;
	const nutrients = await Nutrients.findOne({ userId: req.user._id });
	const today = new Date();
	for (let i = 0; i < history.length; i++) {
		const meal = {
			name: history[i].name,
			fat: history[i].fat,
			carbohydrate: history[i].carbohydrate,
			protein: history[i].protein,
			ethanol: history[i].ethanol
		};
		if (
			nutrients.history.length > 0 &&
			nutrients.history[0].date.getDay() === today.getDay() &&
			nutrients.history[0].date.getMonth() === today.getMonth() &&
			nutrients.history[0].date.getFullYear() === today.getFullYear()
		)
			nutrients.history[0].meals.push(meal);
		else
			nutrients.history.unshift({
				meals: [
					meal
				]
			});
	}
	try {
		await nutrients.save();
		res.sendStatus(200);
	} catch (err) {
		res.status(400).send({ error: err });
	}
});

router.post('/ingredient', async (req, res) => {
	const { error } = nutrientValidation.ingredient(req.body);
	if (error) return res.status(400).send({ error: error.details[0].message });

	const ingredient = new Ingredients(req.body);

	try {
		await ingredient.save();
		res.sendStatus(200);
	} catch (err) {
		res.status(400).send({ error: err });
	}
});

router.get('/ingredients', async (req, res) => {
	const ingredient = await Ingredients.find();

	res.send({ ingredients: ingredient });
});

module.exports = router;
