const router = require('express').Router();
const verify = require('./tokenVerification');
const Nutrients = require('../models/Nutrients');
const Measurements = require('../models/Measurements');
const nutrientValidation = require('../validation/nutrition');
const mealsRoute = require('./meals');
const ingredientsRoute = require('./ingredients');
const {
  macronutrientDensities,
  getMaintenanceCalories,
  getProteinGrams,
  getFatGrams,
  getCarbohydrateGrams,
  getEthanolGrams,
  getFiberGrams,
  getWaterLitres,
} = require('./nutrientUtil');

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

router.post('/calorieOffset', async (req, res) => {
  const { error } = nutrientValidation.calorieOffset(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const nutrients = await Nutrients.findOne({ userId: req.user._id });
  nutrients.calorieOffset = req.body.calorieOffset;
  try {
    await nutrients.save();
    res.sendStatus(200);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.get('/calorieOffset', async (req, res) => {
  const nutrients = await Nutrients.findOne({ userId: req.user._id });
  res.send({ calorieOffset: nutrients.calorieOffset });
});

router.get('/goals', async (req, res) => {
  const measurements = await Measurements.findOne({ userId: req.user._id });

  if (measurements.weight.length == 0) return res.status(404);
  const weight = measurements.weight[0].value;

  const nutrients = await Nutrients.findOne({ userId: req.user._id });

  const calories = Math.round(
    getMaintenanceCalories(weight, nutrients.caloriesPerKg) +
      nutrients.calorieOffset
  );
  const protein = getProteinGrams(weight, nutrients.proteinGramsPerKg);
  const fat = getFatGrams(calories, nutrients.fatCalorieProportion);
  const carbohydrate = getCarbohydrateGrams(
    calories,
    fat * macronutrientDensities.fat,
    protein * macronutrientDensities.protein
  );
  const ethanol = getEthanolGrams();
  const fiber = getFiberGrams(carbohydrate);
  const water = getWaterLitres(weight);

  res.send({
    macronutrients: {
      fat,
      carbohydrate,
      protein,
      ethanol,
      fiber,
    },
    water,
  });
});

router.get('/macronutrientDensities', (req, res) => {
  res.send(macronutrientDensities);
});

router.use('/ingredients', ingredientsRoute);
router.use('/meals', mealsRoute);

module.exports = router;
