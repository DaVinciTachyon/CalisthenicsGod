const router = require('express').Router();
const Ingredients = require('../models/Ingredients');
const nutrientValidation = require('../validation/nutrition');

router.use((req, res, next) => {
	next();
});

router.get('/', async (req, res) => {
	const userIngredients = await Ingredients.findOne({
		userId: req.user._id
	});

	if (userIngredients.ingredients !== undefined)
		res.send({ ingredients: userIngredients.ingredients.filter((ing) => ing.isAvailable) });
	else res.send({ ingredients: [] });
});

router.get('/unavailable', async (req, res) => {
	const userIngredients = await Ingredients.findOne({
		userId: req.user._id
	});

	if (userIngredients.ingredients !== undefined)
		res.send({ ingredients: userIngredients.ingredients.filter((ing) => !ing.isAvailable) });
	else res.send({ ingredients: [] });
});

router.post('/add', async (req, res) => {
	const { error } = nutrientValidation.ingredient(req.body);
	if (error) return res.status(400).send({ error: error.details[0].message });

	const userIngredients = await Ingredients.findOne({
		userId: req.user._id
	});
	userIngredients.ingredients.push(req.body);

	try {
		await userIngredients.save();
		res.status(200).send(userIngredients.ingredients[userIngredients.ingredients.length - 1]);
	} catch (err) {
		res.status(400).send({ error: err });
	}
});

router.post('/makeUnavailable', async (req, res) => {
	if (!req.body._id) return res.status(400).send({ error: 'ID required' });
	const userIngredients = await Ingredients.findOne({
		userId: req.user._id
	});
	const index = userIngredients.ingredients.findIndex((val) => val._id === req.body.id);
	if (index === -1) return res.status(400).send({ error: 'ID not found' });

	userIngredients.ingredients[index].isAvailable = false;
	try {
		await userIngredients.save();
		res.sendStatus(200);
	} catch (err) {
		res.status(400).send({ error: err });
	}
});

router.post('/makeAvailable', async (req, res) => {
	if (!req.body._id) return res.status(400).send({ error: 'ID required' });
	const userIngredients = await Ingredients.findOne({
		userId: req.user._id
	});
	const index = userIngredients.ingredients.findIndex((val) => val._id === req.body.id);
	if (index === -1) return res.status(400).send({ error: 'ID not found' });

	userIngredients.ingredients[index].isAvailable = true;
	try {
		await userIngredients.save();
		res.sendStatus(200);
	} catch (err) {
		res.status(400).send({ error: err });
	}
});

router.post('/edit', async (req, res) => {
	const { error } = nutrientValidation.ingredient(req.body);
	if (error) return res.status(400).send({ error: error.details[0].message });

	const userIngredients = await Ingredients.findOne({
		userId: req.user._id
	});
	const index = userIngredients.ingredients.findIndex((val) => val._id === req.body.id);
	if (index === -1) return res.status(400).send({ error: 'ID not found' });

	userIngredients.ingredients[index].name = req.body.name;
	userIngredients.ingredients[index].fat = req.body.fat;
	userIngredients.ingredients[index].carbohydrate = req.body.carbohydrate;
	userIngredients.ingredients[index].protein = req.body.protein;
	userIngredients.ingredients[index].ethanol = req.body.ethanol;

	try {
		await userIngredients.save();
		res.sendStatus(200);
	} catch (err) {
		res.status(400).send({ error: err });
	}
});

module.exports = router;
