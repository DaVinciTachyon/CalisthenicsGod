const router = require('express').Router();
const verify = require('./tokenVerification');
const NutrientInfo = require('../models/NutrientInfo');
const Measurement = require('../models/Measurement');
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
  let nutrients = await NutrientInfo.findOne({ userId: req.user._id });

  if (!nutrients) {
    nutrients = new NutrientInfo({ userId: req.user._id });

    try {
      await nutrients.save();
      return next();
    } catch (err) {
      console.error(err);
    }
  } else next();
});

router
  .route('/')
  .get(async (req, res) => {
    const nutrients = await NutrientInfo.findOne({ userId: req.user._id });
    res.send({
      caloriesPerKg: nutrients.caloriesPerKg,
      calorieOffset: nutrients.calorieOffset,
      proteinGramsPerKg: nutrients.proteinGramsPerKg,
      fatCalorieProportion: nutrients.fatCalorieProportion,
    });
  })
  .patch(async (req, res) => {
    const { error } = nutrientValidation.userInfo(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const nutrients = await NutrientInfo.findOne({ userId: req.user._id });
    Object.keys(req.body).forEach((name) => (nutrients[name] = req.body[name]));

    try {
      await nutrients.save();
      res.sendStatus(200);
    } catch (err) {
      res.status(400).send({ error: err });
    }
  });

router.route('/goals').get(async (req, res) => {
  const measurements = await Measurement.findOne({ userId: req.user._id });

  if (measurements.weight.length == 0) return res.status(404);
  const weight = measurements.weight[0].value;

  const nutrients = await NutrientInfo.findOne({ userId: req.user._id });

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
