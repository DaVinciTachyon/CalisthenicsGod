const router = require('express').Router();
const verify = require('./tokenVerification');
const NutrientInfo = require('../models/NutrientInfo');
const Measurement = require('../models/Measurement');
const User = require('../models/User');
const { getMaintenanceCalories } = require('./nutrientUtil');

router.use(verify, (req, res, next) => {
  next();
});

router.get('/', async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  const nutrients = await NutrientInfo.findOne({ userId: req.user._id });
  const measurements = await Measurement.findOne({ userId: req.user._id });
  res.send({
    name: user.name,
    email: user.email,
    dateJoined: user.dateJoined,
    birthDate: user.birthDate,
    gender: user.gender,
    weight: measurements.weight[0].value,
    caloriesPerKg: nutrients.caloriesPerKg,
    calorieOffset: nutrients.calorieOffset,
    proteinGramsPerKg: nutrients.proteinGramsPerKg,
    fatCalorieProportion: nutrients.fatCalorieProportion,
  });
});

module.exports = router;
