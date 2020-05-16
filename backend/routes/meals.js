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
	if (nutrients.history !== undefined && nutrients.history.length > 0 && isToday(nutrients.history[0].date))
		for (let i = 0; i < nutrients.history[0].meals.length; i++) {
			let meal = {
				_id: nutrients.history[0].meals[i]._id,
				ingredients: []
			};
			for (let j = 0; j < nutrients.history[0].meals[i].ingredients.length; j++) {
				if (nutrients.history[0].meals[i].ingredients[j].ingredientId) {
					const ingredient = await Ingredients.findOne({
						_id: nutrients.history[0].meals[i].ingredients[j].ingredientId
					});
					const weight = nutrients.history[0].meals[i].ingredients[j].weight;
					meal.ingredients.push({
						name: ingredient.name,
						fat: Math.round(ingredient.fat * weight / 100 * 10) / 10,
						carbohydrate: Math.round(ingredient.carbohydrate * weight / 100 * 10) / 10,
						protein: Math.round(ingredient.protein * weight / 100 * 10) / 10,
						ethanol: Math.round(ingredient.ethanol * weight / 100 * 10) / 10
					});
				} else meal.ingredients.push(nutrients.history[0].meals[i].ingredients[j]);
			}
			meals.push(meal);
		}
	res.send({
		meals: meals
	});
});

router.post('/', async (req, res) => {
	if (req.body.ingredient === undefined) return res.status(400).send({ error: 'Ingredient Required' });
	if (req.body.ingredient.ingredientId !== undefined && req.body.ingredient.weight === undefined)
		return res.status(400).send({ error: 'Weight Required' });
	if (req.body.ingredient.ingredientId === undefined) {
		if (req.body.ingredient.name === undefined) return res.status(400).send({ error: 'Name Required' });
		if (req.body.ingredient.fat === undefined) return res.status(400).send({ error: 'Fat Required' });
		if (req.body.ingredient.carbohydrate === undefined)
			return res.status(400).send({ error: 'Carbohydrate Required' });
		if (req.body.ingredient.protein === undefined) return res.status(400).send({ error: 'Protein Required' });
		if (req.body.ingredient.ethanol === undefined) return res.status(400).send({ error: 'Ethanol Required' });
	}

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

module.exports = router;
