const router = require('express').Router();
const verify = require('./tokenVerification');
const Meal = require('../models/Meal');
const Ingredient = require('../models/Ingredient');
const nutrientValidation = require('../validation/nutrition');

router.use(verify, (req, res, next) => {
  next();
});

router
  .route('/')
  .get(async (req, res) => {
    const meals = await Meal.find({ userId: req.user._id });

    res.send({
      meals: meals,
    });
  })
  .post(async (req, res) => {
    const { error } = nutrientValidation.presetMeal(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const meal = new Meal({
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
  })
  .delete(async (req, res) => {
    const { error } = nutrientValidation.id(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    await Meal.findByIdAndDelete(req.body._id);

    res.sendStatus(200);
  });

router.post('/ingredients', async (req, res) => {
  const { error } = nutrientValidation.id(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const meal = await Meal.findById(req.body._id);
  if (!meal) return res.status(400).send({ error: '_id invalid' });

  let ingredients = [];
  for (let i = 0; i < meal.ingredients.length; i++) {
    const ingredient = await Ingredient.findById(meal.ingredients[i].id);
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

router
  .route('/ingredient')
  .post(async (req, res) => {
    const { error } = nutrientValidation.mealIngredient(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const meal = await Meal.findById(req.body._id);

    meal.ingredients.push(req.body.ingredient);

    try {
      await meal.save();
      res.status(200).send({
        _id: meal._id,
        ingredient: {
          _id: meal.ingredients[meal.ingredients.length - 1]._id,
        },
      });
    } catch (err) {
      res.status(400).send({ error: err });
    }
  })
  .delete(async (req, res) => {
    const { error } = nutrientValidation.mealIngredientId(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const meal = await Meal.findById(req.body._id);
    if (!meal) return res.status(400).send({ error: 'Invalid Meal ID' });

    const index = meal.ingredients.findIndex(
      (val) => val._id == req.body.ingredient._id
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
  })
  .patch(async (req, res) => {
    const { error } = nutrientValidation.mealIngredient(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const meal = await Meal.findById(req.body._id);
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

router.get('/names', async (req, res) => {
  const meals = await Meal.find({ userId: req.user._id });

  res.send({
    meals: meals.map((val) => {
      return { _id: val._id, name: val.name };
    }),
  });
});

module.exports = router;
