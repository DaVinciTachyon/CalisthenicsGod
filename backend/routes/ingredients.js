const router = require('express').Router();
const Ingredients = require('../models/Ingredients');
const nutrientValidation = require('../validation/nutrition');

router.use((req, res, next) => {
	next();
});

router.get('/', async (req, res) => {
	const ingredients = await Ingredients.find({
		userId: req.user._id,
		isAvailable: true
	});

	res.send({ ingredients: ingredients });
});

router.get('/unavailable', async (req, res) => {
	const ingredients = await Ingredients.find({
		userId: req.user._id,
		isAvailable: false
	});

	res.send({ ingredients: ingredients });
});

router.post('/add', async (req, res) => {
	const { error } = nutrientValidation.ingredient(req.body);
	if (error) return res.status(400).send({ error: error.details[0].message });

	const ingredientName = await Ingredients.findOne({
		userId: req.user._id,
		name: req.body.name
	});
	if (ingredientName) return res.status(400).send({ error: 'Name already in use.' });

	const ingredient = new Ingredients({
		name: req.body.name,
		fat: req.body.fat,
		carbohydrate: req.body.carbohydrate,
		protein: req.body.protein,
		ethanol: req.body.ethanol,
		userId: req.user._id
	});

	try {
		await ingredient.save();
		res.status(200).send(ingredient);
	} catch (err) {
		res.status(400).send({ error: err });
	}
});

router.post('/makeUnavailable', async (req, res) => {
	if (!req.body._id) return res.status(400).send({ error: 'ID required' });
	const ingredient = await Ingredients.findOne({
		userId: req.user._id,
		_id: req.body._id
	});
	if (!ingredient) return res.status(400).send({ error: 'ID not found' });

	ingredient.isAvailable = false;

	try {
		await ingredient.save();
		res.sendStatus(200);
	} catch (err) {
		res.status(400).send({ error: err });
	}
});

router.post('/makeAvailable', async (req, res) => {
	if (!req.body._id) return res.status(400).send({ error: 'ID required' });
	const ingredient = await Ingredients.findOne({
		userId: req.user._id,
		_id: req.body._id
	});
	if (!ingredient) return res.status(400).send({ error: 'ID not found' });

	ingredient.isAvailable = true;

	try {
		await ingredient.save();
		res.sendStatus(200);
	} catch (err) {
		res.status(400).send({ error: err });
	}
});

router.post('/edit', async (req, res) => {
	const { error } = nutrientValidation.ingredient(req.body);
	if (error) return res.status(400).send({ error: error.details[0].message });

	const ingredient = await Ingredients.findOne({
		userId: req.user._id,
		_id: req.body._id
	});
	if (!ingredient) return res.status(400).send({ error: 'ID not found' });

	ingredient.name = req.body.name;
	ingredient.fat = req.body.fat;
	ingredient.carbohydrate = req.body.carbohydrate;
	ingredient.protein = req.body.protein;
	ingredient.ethanol = req.body.ethanol;

	try {
		await ingredient.save();
		res.sendStatus(200);
	} catch (err) {
		res.status(400).send({ error: err });
	}
});

module.exports = router;
