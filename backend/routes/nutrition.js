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

router.use(verify, async (req, res, next) => {
  let nutrients = await Nutrients.findOne({ userId: req.user._id });

  if (!nutrients) {
    nutrients = new Nutrients({ userId: req.user._id });

    try {
      await nutrients.save();
      return next();
    } catch (err) {
      console.error(err);
    }
  } else next();
});

router.route('/calorieOffset').get(async (req, res) => {
  const nutrients = await Nutrients.findOne({ userId: req.user._id });
  res.send({ calorieOffset: nutrients.calorieOffset });
});

router.route('/userInfo').post(async (req, res) => {
  const { error } = nutrientValidation.userInfo(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const nutrients = await Nutrients.findOne({ userId: req.user._id });
  nutrients.calorieOffset = req.body.calorieOffset;
  nutrients.caloriesPerKg = req.body.caloriesPerKg;
  nutrients.proteinGramsPerKg = req.body.proteinGramsPerKg;
  nutrients.fatCalorieProportion = req.body.fatCalorieProportion;
  try {
    await nutrients.save();
    res.sendStatus(200);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.route('/goals').get(async (req, res) => {
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

router.route('/macronutrientDensities').get((req, res) => {
  res.send(macronutrientDensities);
});

router.use('/ingredients', ingredientsRoute);
router.use('/meals', mealsRoute);

module.exports = router;
