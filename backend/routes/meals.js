const router = require('express').Router();
const verify = require('./verifyToken');
const Nutrients = require('../models/Nutrients');
const Ingredients = require('../models/Ingredients');
const nutrientValidation = require('../validation/nutrition');

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

router.get('/today', async (req, res) => {
	const nutrients = await Nutrients.findOne({ userId: req.user._id });
	let meals = [];
	if (nutrients.history !== undefined && nutrients.history.length > 0 && isToday(nutrients.history[0].date)) {
		const userIngredients = await Ingredients.findOne({
			userId: req.user._id
		});
		for (let i = 0; i < nutrients.history[0].meals.length; i++) {
			let meal = {
				_id: nutrients.history[0].meals[i]._id,
				ingredients: []
			};
			for (let j = 0; j < nutrients.history[0].meals[i].ingredients.length; j++) {
				const ingredient = userIngredients.ingredients.find(
					(val) => val._id == nutrients.history[0].meals[i].ingredients[j].ingredientId
				);
				meal.ingredients.push({
					_id: nutrients.history[0].meals[i].ingredients[j]._id,
					name: ingredient.name,
					weight: nutrients.history[0].meals[i].ingredients[j].weight,
					fat: ingredient.fat,
					carbohydrate: ingredient.carbohydrate,
					protein: ingredient.protein,
					ethanol: ingredient.ethanol
				});
			}
			meals.push(meal);
		}
	}
	res.send({
		meals: meals
	});
});

//FIXME separate
router.post('/', async (req, res) => {
	if (req.body.ingredient === undefined) return res.status(400).send({ error: 'Ingredient Required' });

	const { error } = nutrientValidation.mealIngredient(req.body.ingredient);
	if (error) return res.status(400).send({ error: error.details[0].message });

	const nutrients = await Nutrients.findOne({ userId: req.user._id });

	if (
		req.body.mealId &&
		nutrients.history !== undefined &&
		nutrients.history.length > 0 &&
		nutrients.history[0].meals !== undefined &&
		nutrients.history[0].meals.length > 0
	) {
		const meal = nutrients.history[0].meals.findIndex((info) => info._id == req.body.mealId);
		if (meal === -1) return res.status(400).send({ error: 'Incorrect Meal ID' });
		nutrients.history[0].meals[meal].ingredients.push(req.body.ingredient);
	} else {
		if (nutrients.history !== undefined && nutrients.history.length > 0 && isToday(nutrients.history[0].date)) {
			nutrients.history[0].meals.push({
				ingredients: [
					req.body.ingredient
				]
			});
		} else {
			nutrients.history.unshift({
				meals: [
					{
						ingredients: [
							req.body.ingredient
						]
					}
				]
			});
		}
	}

	try {
		await nutrients.save();
		res.sendStatus(200);
	} catch (err) {
		res.status(400).send({ error: err });
	}
});

router.post('/remove', async (req, res) => {
	if (!req.body.mealId) return res.status(400).send({ error: 'Meal ID Required' });
	if (!req.body.ingredientId) return res.status(400).send({ error: 'Ingredient ID Required' });

	const nutrients = await Nutrients.findOne({ userId: req.user._id });

	const mealIndex = nutrients.history[0].meals.findIndex((meal) => meal._id == req.body.mealId);
	if (mealIndex === -1) return res.status(400).send({ error: 'Invalid Meal ID' });

	const ingredientIndex = nutrients.history[0].meals[mealIndex].ingredients.findIndex(
		(ingredient) => ingredient._id == req.body.ingredientId
	);
	if (ingredientIndex === -1) return res.status(400).send({ error: 'Invalid Ingredient ID' });

	if (nutrients.history[0].meals[mealIndex].ingredients.length > 1)
		nutrients.history[0].meals[mealIndex].ingredients.splice(ingredientIndex, 1);
	else nutrients.history[0].meals.splice(mealIndex, 1);

	try {
		await nutrients.save();
		res.sendStatus(200);
	} catch (err) {
		res.status(400).send({ error: err });
	}
});

module.exports = router;
