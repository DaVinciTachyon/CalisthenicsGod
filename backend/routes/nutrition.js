const router = require('express').Router();
const verify = require('./verifyToken');
const Nutrients = require('../models/Nutrients');
const Measurements = require('../models/Measurements');
const Ingredients = require('../models/Ingredients');
const nutrientValidation = require('../validation/nutrition');
const mealsRoute = require('./meals');
const ingredientsRoute = require('./ingredients');

const macronutrientDensities = {
	//FIXME in db?
	fat: 9,
	carbohydrate: 4,
	protein: 4,
	ethanol: 7
};

/**
 * Find if today's date
 * @param {Date} date 
 */
const isToday = (date) => {
	const today = new Date();
	return (
		date.getDate() === today.getDate() &&
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear()
	);
};

router.use(verify, (req, res, next) => {
	next();
});

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

router.get('/today/userInfo', async (req, res) => {
	//TODO separate
	const measurements = await Measurements.findOne({ userId: req.user._id });
	const nutrients = await Nutrients.findOne({ userId: req.user._id });

	const weight = measurements.weight.length > 0 ? measurements.weight[0].value : 0;
	if (weight == 0) return res.status(404);

	let fat = 0;
	let carbohydrates = 0;
	let protein = 0;
	let ethanol = 0;
	if (nutrients.history.length > 0 && isToday(nutrients.history[0].date)) {
		const userIngredients = await Ingredients.findOne({
			userId: req.user._id
		});
		for (let i = 0; i < nutrients.history[0].meals.length; i++) {
			for (let j = 0; j < nutrients.history[0].meals[i].ingredients.length; j++) {
				const weight = nutrients.history[0].meals[i].ingredients[j].weight;
				if (nutrients.history[0].meals[i].ingredients[j].ingredientId) {
					const ingredient = userIngredients.ingredients.find(
						(val) => val._id == nutrients.history[0].meals[i].ingredients[j].ingredientId
					);
					fat += ingredient.fat * weight / 100;
					carbohydrates += ingredient.carbohydrate * weight / 100;
					protein += ingredient.protein * weight / 100;
					ethanol += ingredient.ethanol * weight / 100;
				} else {
					fat += nutrients.history[0].meals[i].ingredients[j].fat * weight / 100;
					carbohydrates += nutrients.history[0].meals[i].ingredients[j].carbohydrate * weight / 100;
					protein += nutrients.history[0].meals[i].ingredients[j].protein * weight / 100;
					ethanol += nutrients.history[0].meals[i].ingredients[j].ethanol * weight / 100;
				}
			}
		}
	}

	fat = Math.round(fat * 10) / 10;
	carbohydrates = Math.round(carbohydrates * 10) / 10;
	protein = Math.round(protein * 10) / 10;
	ethanol = Math.round(ethanol * 10) / 10;

	const totalCalories = Math.round(nutrients.maintenanceCalories + nutrients.calorieOffset);

	const goalProtG = Math.round(weight * nutrients.proteinAmount * 10) / 10;
	const goalFatG = Math.round(totalCalories * nutrients.fatPartition / macronutrientDensities.fat * 10) / 10;
	const goalCarbG =
		Math.round(
			(totalCalories - goalFatG * macronutrientDensities.fat - goalProtG * macronutrientDensities.protein) /
				macronutrientDensities.carbohydrate *
				10
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

router.use('/ingredients', ingredientsRoute);
router.use('/meals', mealsRoute);

module.exports = router;
