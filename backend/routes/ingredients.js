const router = require('express').Router();
const Ingredient = require('../models/Ingredient');
const nutrientValidation = require('../validation/nutrition');

router.use((req, res, next) => {
  next();
});

router.get('/', async (req, res) => {
  const ingredients = await Ingredient.find({
    userId: req.user._id,
    isAvailable: true,
  });

  res.send({ ingredients });
});

router.get('/unavailable', async (req, res) => {
  const ingredients = await Ingredient.find({
    userId: req.user._id,
    isAvailable: false,
  });

  res.send({ ingredients });
});

router.post('/', async (req, res) => {
  const { error } = nutrientValidation.ingredient(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const ingredientName = await Ingredient.findOne({
    userId: req.user._id,
    name: req.body.name,
  });
  if (ingredientName)
    return res.status(400).send({ error: 'Name already in use.' });

  const ingredient = new Ingredient({
    name: req.body.name,
    macronutrients: req.body.macronutrients,
    userId: req.user._id,
  });

  try {
    await ingredient.save();
    res.status(200).send(ingredient);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.post('/makeUnavailable', async (req, res) => {
  const { error } = nutrientValidation.id(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const ingredient = await Ingredient.findOne({
    userId: req.user._id,
    _id: req.body._id,
  });
  if (!ingredient) return res.status(400).send({ error: '_id not found' });

  ingredient.isAvailable = false;

  try {
    await ingredient.save();
    res.sendStatus(200);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.post('/makeAvailable', async (req, res) => {
  const { error } = nutrientValidation.id(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const ingredient = await Ingredient.findOne({
    userId: req.user._id,
    _id: req.body._id,
  });
  if (!ingredient) return res.status(400).send({ error: '_id not found' });

  ingredient.isAvailable = true;

  try {
    await ingredient.save();
    res.sendStatus(200);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.post('/edit', async (req, res) => {
  const { error } = nutrientValidation.editIngredient(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const ingredient = await Ingredient.findOne({
    userId: req.user._id,
    _id: req.body._id,
  });
  if (!ingredient) return res.status(400).send({ error: '_id not found' });

  ingredient.name = req.body.name;
  ingredient.macronutrients = req.body.macronutrients;

  try {
    await ingredient.save();
    res.sendStatus(200);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

module.exports = router;
