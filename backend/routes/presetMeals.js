const router = require('express').Router();
const verify = require('./tokenVerification');
const Meals = require('../models/Meals');
const Ingredients = require('../models/Ingredients');
const nutrientValidation = require('../validation/nutrition');

router.use(verify, (req, res, next) => {
  next();
});

router.get('/', async (req, res) => {
  const meals = await Meals.find({ userId: req.user._id });

  res.send({
    meals: meals,
  });
});

router.post('/ingredients', async (req, res) => {
  const { error } = nutrientValidation.id(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const meal = await Meals.findById(req.body._id);
  if (!meal) return res.status(400).send({ error: '_id invalid' });

  let ingredients = [];
  for (let i = 0; i < meal.ingredients.length; i++) {
    const ingredient = await Ingredients.findById(meal.ingredients[i].id);
    ingredients.push({
      _id: ingredient._id,
      name: ingredient.name,
      weight: meal.ingredients[i].weight,
      macronutrients: ingredient.macronutrients,
    });
  }

  res.send({
    ingredients: ingredients,
  });
});

router.get('/names', async (req, res) => {
  const meals = await Meals.find({ userId: req.user._id });

  res.send({
    meals: meals.map((val) => {
      return { _id: val._id, name: val.name };
    }),
  });
});

router.post('/', async (req, res) => {
  const { error } = nutrientValidation.presetMeal(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const meal = new Meals({
    name: req.body.name,
    ingredients: req.body.ingredients,
    userId: req.user._id,
  });

  try {
    await meal.save();
    res.status(200).send(meal);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.post('/remove', async (req, res) => {
  const { error } = nutrientValidation.id(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  await Meals.findByIdAndDelete(req.body._id);

  res.sendStatus(200);
});

router.post('/ingredient/add', async (req, res) => {
  const { error } = nutrientValidation.mealIngredient(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const meal = await Meals.findById(req.body._id);

  meal.ingredients.push(req.body.ingredient);

  try {
    await meal.save();
    res.status(200).send(meal);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.post('/ingredient/remove', async (req, res) => {
  const { error } = nutrientValidation.mealIngredientId(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const meal = await Meals.findById(req.body._id);
  if (!meal) return res.status(400).send({ error: 'Invalid Meal ID' });

  const index = meal.ingredients.findIndex(
    (val) => val.id == req.body.ingredientId
  );
  if (index === -1)
    return res.status(400).send({ error: 'Invalid Ingredient ID' });

  meal.ingredients.splice(index, 1);

  try {
    await meal.save();
    res.status(200).send(meal);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.post('/ingredient/edit', async (req, res) => {
  const { error } = nutrientValidation.mealIngredient(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const meal = await Meals.findById(req.body._id);
  if (!meal) return res.status(400).send({ error: 'Invalid Meal ID' });

  const index = meal.ingredients.findIndex(
    (val) => val.id == req.body.ingredient.id
  );
  if (index === -1)
    return res.status(400).send({ error: 'Invalid Ingredient ID' });

  meal.ingredients[index].weight = req.body.ingredient.weight;

  try {
    await meal.save();
    res.status(200).send(meal);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

module.exports = router;
