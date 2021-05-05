const router = require('express').Router();
const verify = require('./verifyToken');
const Nutrients = require('../models/Nutrients');
const Ingredients = require('../models/Ingredients');
const Meals = require('../models/Meals');
const nutrientValidation = require('../validation/nutrition');
const presetMealsRoute = require('./presetMeals');

const macronutrientDensities = {
  //FIXME in db?
  fat: 9,
  carbohydrate: 4,
  protein: 4,
  ethanol: 7,
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

router.post('/edit', async (req, res) => {
  if (!req.body.mealId)
    return res.status(400).send({ error: 'Meal ID Required' });
  if (!req.body._id)
    return res.status(400).send({ error: 'Ingredient ID Required' });
  if (!req.body.weight)
    return res.status(400).send({ error: 'Weight Required' });
  if (isNaN(req.body.weight) || req.body.weight <= 0)
    return res.status(400).send({ error: 'Invalid Weight' });

  const nutrients = await Nutrients.findOne({ userId: req.user._id });
  const mealIndex = nutrients.history[0].meals.findIndex(
    (val) => val._id == req.body.mealId
  );
  if (mealIndex === -1)
    return res.status(400).send({ error: 'Invalid Meal ID' });
  const ingredientIndex = nutrients.history[0].meals[
    mealIndex
  ].ingredients.findIndex((val) => val._id == req.body._id);
  if (ingredientIndex === -1)
    return res.status(400).send({ error: 'Invalid Ingredient ID' });

  nutrients.history[0].meals[mealIndex].ingredients[ingredientIndex].weight =
    req.body.weight;

  try {
    await nutrients.save();
    res.sendStatus(200);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.get('/today', async (req, res) => {
  const nutrients = await Nutrients.findOne({ userId: req.user._id });
  let meals = [];
  if (
    nutrients.history !== undefined &&
    nutrients.history.length > 0 &&
    isToday(nutrients.history[0].date)
  ) {
    for (let i = 0; i < nutrients.history[0].meals.length; i++) {
      let meal = {
        _id: nutrients.history[0].meals[i]._id,
        ingredients: [],
      };
      for (
        let j = 0;
        j < nutrients.history[0].meals[i].ingredients.length;
        j++
      ) {
        const ingredient = await Ingredients.findOne({
          _id: nutrients.history[0].meals[i].ingredients[j].ingredientId,
          userId: req.user._id,
        });
        meal.ingredients.push({
          _id: nutrients.history[0].meals[i].ingredients[j]._id,
          name: ingredient.name,
          weight: nutrients.history[0].meals[i].ingredients[j].weight,
          fat: nutrients.history[0].meals[i].ingredients[j].fat,
          carbohydrate:
            nutrients.history[0].meals[i].ingredients[j].carbohydrate,
          protein: nutrients.history[0].meals[i].ingredients[j].protein,
          ethanol: nutrients.history[0].meals[i].ingredients[j].ethanol,
        });
      }
      meals.push(meal);
    }
  }
  res.send({
    meals: meals,
  });
});

router.post('/', async (req, res) => {
  if (!req.body.ingredient)
    return res.status(400).send({ error: 'Ingredient Required' });

  const { error } = nutrientValidation.mealIngredient(req.body.ingredient);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const nutrients = await Nutrients.findOne({ userId: req.user._id });

  const ogIngredient = await Ingredients.findOne({
    userId: req.user._id,
    _id: req.body.ingredient.ingredientId,
  });
  if (!ogIngredient)
    return res.status(400).send({ error: 'Invalid Ingredient ID' });

  const ingredient = {
    ingredientId: req.body.ingredient.ingredientId,
    weight: req.body.ingredient.weight,
    fat: ogIngredient.fat,
    carbohydrate: ogIngredient.carbohydrate,
    protein: ogIngredient.protein,
    ethanol: ogIngredient.ethanol,
  };

  if (
    req.body.mealId &&
    nutrients.history !== undefined &&
    nutrients.history.length > 0 &&
    nutrients.history[0].meals !== undefined &&
    nutrients.history[0].meals.length > 0
  ) {
    const meal = nutrients.history[0].meals.findIndex(
      (info) => info._id == req.body.mealId
    );
    if (meal === -1)
      return res.status(400).send({ error: 'Incorrect Meal ID' });
    nutrients.history[0].meals[meal].ingredients.push(ingredient);
  } else {
    if (
      nutrients.history !== undefined &&
      nutrients.history.length > 0 &&
      isToday(nutrients.history[0].date)
    ) {
      nutrients.history[0].meals.unshift({
        ingredients: [ingredient],
      });
    } else {
      nutrients.history.unshift({
        meals: [
          {
            ingredients: [ingredient],
          },
        ],
      });
    }
  }

  try {
    await nutrients.save();
    res.status(200).send({
      mealId: req.body.mealId
        ? req.body.mealId
        : nutrients.history[0].meals[0]._id,
    });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.post('/remove', async (req, res) => {
  if (!req.body.mealId)
    return res.status(400).send({ error: 'Meal ID Required' });
  if (!req.body.ingredientId)
    return res.status(400).send({ error: 'Ingredient ID Required' });

  const nutrients = await Nutrients.findOne({ userId: req.user._id });

  const mealIndex = nutrients.history[0].meals.findIndex(
    (meal) => meal._id == req.body.mealId
  );
  if (mealIndex === -1)
    return res.status(400).send({ error: 'Invalid Meal ID' });

  const ingredientIndex = nutrients.history[0].meals[
    mealIndex
  ].ingredients.findIndex(
    (ingredient) => ingredient._id == req.body.ingredientId
  );
  if (ingredientIndex === -1)
    return res.status(400).send({ error: 'Invalid Ingredient ID' });

  if (nutrients.history[0].meals[mealIndex].ingredients.length > 1)
    nutrients.history[0].meals[mealIndex].ingredients.splice(
      ingredientIndex,
      1
    );
  else nutrients.history[0].meals.splice(mealIndex, 1);

  try {
    await nutrients.save();
    res.sendStatus(200);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.post('/addPreset', async (req, res) => {
  if (!req.body._id) return res.status(400).send('ID Required');
  const meal = await Meals.findById(req.body._id);
  const nutrients = await Nutrients.findOne({ userId: req.user._id });

  if (meal.ingredients.length === 0)
    return res.status(400).send('No Ingredients');
  let ingredients = [];
  for (const ingredient of meal.ingredients) {
    const ogIngredient = await Ingredients.findOne({
      userId: req.user._id,
      _id: ingredient.ingredientId,
    });
    if (!ogIngredient)
      return res.status(400).send({ error: 'Invalid Ingredient ID' });

    ingredients.push({
      ingredientId: ingredient.ingredientId,
      weight: ingredient.weight,
      fat: ogIngredient.fat,
      carbohydrate: ogIngredient.carbohydrate,
      protein: ogIngredient.protein,
      ethanol: ogIngredient.ethanol,
    });
  }

  if (
    nutrients.history !== undefined &&
    nutrients.history.length > 0 &&
    isToday(nutrients.history[0].date)
  )
    nutrients.history[0].meals.push({ ingredients: ingredients });
  else
    nutrients.history.unshift({
      meals: [
        {
          ingredients: ingredients,
        },
      ],
    });

  try {
    await nutrients.save();
    res.sendStatus(200);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.use('/preset', presetMealsRoute);

module.exports = router;
