const router = require('express').Router();
const verify = require('./tokenVerification');
const NutrientInfo = require('../models/NutrientInfo');
const Ingredient = require('../models/Ingredient');
const Meal = require('../models/Meal');
const nutrientValidation = require('../validation/nutrition');
const presetMealsRoute = require('./presetMeals');

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

router
  .route('/')
  .get(async (req, res) => {
    const nutrients = await NutrientInfo.findOne({ userId: req.user._id });
    const day = nutrients.history[0];
    let meals = [];
    if (hasHistory(nutrients) && isToday(day.date)) {
      for (const meal of day.meals) {
        const fullMeal = {
          _id: meal._id,
          ingredients: [],
        };
        for (const ingredient of meal.ingredients) {
          const fullIngredient = await Ingredient.findOne({
            _id: ingredient.id,
            userId: req.user._id,
          });
          fullMeal.ingredients.push({
            _id: ingredient._id,
            id: ingredient.id,
            name: fullIngredient.name,
            weight: ingredient.weight,
            macronutrients: fullIngredient.macronutrients,
          });
        }
        meals.push(fullMeal);
      }
    }
    res.status(200).send({ meals });
  })
  .patch(async (req, res) => {
    const { error } = nutrientValidation.mealIngredientEdit(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const nutrients = await NutrientInfo.findOne({ userId: req.user._id });
    const day = nutrients.history[0];
    const mealIndex = day.meals.findIndex((val) => val._id == req.body._id);
    if (mealIndex === -1)
      return res.status(400).send({ error: 'Invalid Meal ID' });

    const ingredients = day.meals[mealIndex].ingredients;
    const ingredientIndex = ingredients.findIndex(
      (val) => val._id == req.body.ingredient._id
    );
    if (ingredientIndex === -1)
      return res.status(400).send({ error: 'Invalid Ingredient ID' });

    ingredients[ingredientIndex].weight = req.body.ingredient.weight;

    try {
      await nutrients.save();
      res.sendStatus(200);
    } catch (err) {
      res.status(400).send({ error: err });
    }
  })
  .post(async (req, res) => {
    const { error } = nutrientValidation.meal(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const ingredient = await Ingredient.findOne({
      userId: req.user._id,
      _id: req.body.ingredient.id,
    });
    if (!ingredient)
      return res.status(400).send({ error: 'Invalid Ingredient ID' });

    const nutrients = await NutrientInfo.findOne({ userId: req.user._id });
    const day = nutrients.history[0];

    if (req.body._id && hasHistory(nutrients) && hasMeals(day)) {
      const meal = day.meals.findIndex((info) => info._id == req.body._id);
      if (meal === -1)
        return res.status(400).send({ error: 'Incorrect Meal ID' });

      day.meals[meal].ingredients.push(req.body.ingredient);
    } else if (hasHistory(nutrients) && isToday(day.date))
      day.meals.unshift({
        ingredients: [req.body.ingredient],
      });
    else
      nutrients.history.unshift({
        meals: [
          {
            ingredients: [req.body.ingredient],
          },
        ],
      });

    try {
      await nutrients.save();
      res.status(200).send({
        _id: req.body._id ? req.body._id : day.meals[0]._id,
      });
    } catch (err) {
      res.status(400).send({ error: err });
    }
  })
  .delete(async (req, res) => {
    const { error } = nutrientValidation.mealIngredientId(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const nutrients = await NutrientInfo.findOne({ userId: req.user._id });
    const meals = nutrients.history[0].meals;

    const mealIndex = meals.findIndex((meal) => meal._id == req.body._id);
    if (mealIndex === -1)
      return res.status(400).send({ error: 'Invalid Meal ID' });
    const ingredients = meals[mealIndex].ingredients;

    const ingredientIndex = ingredients.findIndex(
      (ingredient) => ingredient._id == req.body.ingredientId
    );
    if (ingredientIndex === -1)
      return res.status(400).send({ error: 'Invalid Ingredient ID' });

    if (ingredients.length > 1) ingredients.splice(ingredientIndex, 1);
    else meals.splice(mealIndex, 1);

    try {
      await nutrients.save();
      res.sendStatus(200);
    } catch (err) {
      res.status(400).send({ error: err });
    }
  });

const hasHistory = (nutrients) =>
  nutrients.history !== undefined && nutrients.history.length > 0;

const hasMeals = (day) => day.meals !== undefined && day.meals.length > 0;

router.post('/addPreset', async (req, res) => {
  const { error } = nutrientValidation.id(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const meal = await Meal.findById(req.body._id);
  if (!meal) return res.status(400).send({ error: 'Invalid Meal ID' });
  if (meal.ingredients.length === 0)
    return res.status(400).send({ error: 'No Ingredient' });

  const nutrients = await NutrientInfo.findOne({ userId: req.user._id });

  const meals = nutrients.history[0].meals;
  if (hasHistory(nutrients) && isToday(nutrients.history[0].date))
    meals.push({ ingredients: [] });
  else nutrients.history.unshift({ meals: [{ ingredients: [] }] });

  const ingredients = meals[meals.length - 1].ingredients;
  for (const ingredient of meal.ingredients) {
    const fullIngredient = await Ingredient.findOne({
      userId: req.user._id,
      _id: ingredient.id,
    });
    if (!fullIngredient)
      return res.status(400).send({ error: 'Invalid Ingredient ID' });

    ingredients.push({ id: ingredient.id, weight: ingredient.weight });
  }

  try {
    await nutrients.save();
    res.sendStatus(200);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.use('/preset', presetMealsRoute);

module.exports = router;
