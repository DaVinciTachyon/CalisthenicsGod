const router = require('express').Router();
const verify = require('./verifyToken');
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
  if (!req.body._id) return res.status(400).send({ error: 'ID Required' });
  const meal = await Meals.findById(req.body._id);
  if (!meal) return res.status(400).send({ error: 'Invalid ID' });

  let ingredients = [];
  for (let i = 0; i < meal.ingredients.length; i++) {
    const ingredient = await Ingredients.findById(meal.ingredients[i]._id);
    ingredients.push({
      _id: ingredient._id,
      name: ingredient.name,
      weight: meal.ingredients[i].weight,
      fat: ingredient.fat,
      carbohydrate: ingredient.carbohydrate,
      protein: ingredient.protein,
      ethanol: ingredient.ethanol,
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

router.post('/add', async (req, res) => {
  const { error } = nutrientValidation.meal(req.body);
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
  if (!req.body._id) return res.status(400).send({ error: 'Meal ID Required' });

  await Meals.findByIdAndDelete(req.body._id);

  res.sendStatus(200);
});

router.post('/addIngredient', async (req, res) => {
  if (!req.body._id) return res.status(400).send({ error: 'Meal ID Required' });
  if (!req.body.ingredient)
    return res.status(400).send({ error: 'Ingredient Required' });

  const { error } = nutrientValidation.mealIngredient(req.body.ingredient);
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

router.post('/removeIngredient', async (req, res) => {
  if (!req.body._id) return res.status(400).send({ error: 'Meal ID Required' });
  if (!req.body.ingredientId)
    return res.status(400).send({ error: 'Ingredient ID Required' });

  const meal = await Meals.findById(req.body._id);
  if (!meal) return res.status(400).send({ error: 'Invalid Meal ID' });

  const index = meal.ingredients.findIndex(
    (val) => val._id == req.body.ingredientId
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

router.post('/editIngredient', async (req, res) => {
  if (!req.body._id) return res.status(400).send({ error: 'Meal ID Required' });
  if (!req.body.ingredientId)
    return res.status(400).send({ error: 'Ingredient ID Required' });
  if (!req.body.weight)
    return res.status(400).send({ error: 'Weight Required' });
  if (isNaN(req.body.weight) || req.body.weight <= 0)
    return res.status(400).send({ error: 'Invalid Weight' });

  const meal = await Meals.findById(req.body._id);
  if (!meal) return res.status(400).send({ error: 'Invalid Meal ID' });

  const index = meal.ingredients.findIndex(
    (val) => val._id == req.body.ingredientId
  );
  if (index === -1)
    return res.status(400).send({ error: 'Invalid Ingredient ID' });

  meal.ingredients[index].weight = req.body.weight;
  try {
    await meal.save();
    res.status(200).send(meal);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

module.exports = router;
