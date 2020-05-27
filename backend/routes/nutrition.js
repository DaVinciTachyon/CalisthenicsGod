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
	fat          : 9,
	carbohydrate : 4,
	protein      : 4,
	ethanol      : 7
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

router.get('/goals', async (req, res) => {
	const measurements = await Measurements.findOne({ userId: req.user._id });

	if (measurements.weight.length == 0) return res.status(404);
	const weight = measurements.weight[0].value;

	const nutrients = await Nutrients.findOne({ userId: req.user._id });

	const calories = Math.round(nutrients.maintenanceCalories + nutrients.calorieOffset);

	const protein = Math.round(weight * nutrients.proteinAmount * 10) / 10;
	const fat =
		Math.round(calories * nutrients.fatPartition / macronutrientDensities.fat * 10) / 10;
	const carbohydrate =
		Math.round(
			(calories -
				fat * macronutrientDensities.fat -
				protein * macronutrientDensities.protein) /
				macronutrientDensities.carbohydrate *
				10
		) / 10;
	const ethanol = 0;

	res.send({
		fat          : fat,
		carbohydrate : carbohydrate,
		protein      : protein,
		ethanol      : ethanol
	});
});

router.get('/macronutrientDensities', (req, res) => {
	res.send(macronutrientDensities);
});

router.use('/ingredients', ingredientsRoute);
router.use('/meals', mealsRoute);

module.exports = router;
